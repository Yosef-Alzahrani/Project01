import json
import os
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .auth import decode_token, get_jwt_secret_info, hash_password, sign_token, verify_password
from .db import db_all, db_get, db_run, get_db_path, init_db
from .model import CLASSES, SEVERITY_MAP, generate_model_metrics, predict_wound

# ── Init ──────────────────────────────────────────────────────────────────────
init_db()

PORT = int(os.environ.get("PORT", 5000))
DEFAULT_CORS_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"]
raw_cors_origins = os.environ.get("CORS_ORIGINS") or os.environ.get("CORS_ORIGIN")
CORS_ORIGINS = [
    origin.strip()
    for origin in (raw_cors_origins.split(",") if raw_cors_origins else DEFAULT_CORS_ORIGINS)
    if origin.strip()
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Auth helpers ───────────────────────────────────────────────────────────────
def _token_from(request: Request) -> Optional[str]:
    auth = request.headers.get("Authorization", "")
    return auth[7:] if auth.startswith("Bearer ") else None


def _require_auth(request: Request) -> dict:
    token = _token_from(request)
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload


# ── Routes ─────────────────────────────────────────────────────────────────────
@app.get("/api/health")
def health():
    return {"ok": True, "dbPath": get_db_path(), "jwt": get_jwt_secret_info()}


class RegisterBody(BaseModel):
    email: str
    password: str
    name: Optional[str] = None


class LoginBody(BaseModel):
    email: str
    password: str


@app.post("/api/auth/register", status_code=201)
def register(body: RegisterBody):
    email = body.email.strip().lower()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Invalid email")
    if not body.password or len(body.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")

    if db_get("SELECT id FROM users WHERE email = ?", (email,)):
        raise HTTPException(status_code=409, detail="Email already registered")

    name = body.name.strip() if body.name else None
    created_at = datetime.now(timezone.utc).isoformat()
    db_run(
        "INSERT INTO users (email, password_hash, name, created_at) VALUES (?, ?, ?, ?)",
        (email, hash_password(body.password), name, created_at),
    )
    user = db_get(
        "SELECT id, email, name, created_at as createdAt FROM users WHERE email = ?", (email,)
    )
    return {"token": sign_token(user), "user": user}


@app.post("/api/auth/login")
def login(body: LoginBody):
    email = body.email.strip().lower()
    if not email or not body.password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    row = db_get(
        "SELECT id, email, name, password_hash, created_at as createdAt FROM users WHERE email = ?",
        (email,),
    )
    if not row or not verify_password(body.password, row["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user = {k: v for k, v in row.items() if k != "password_hash"}
    return {"token": sign_token(user), "user": user}


@app.get("/api/auth/me")
def me(request: Request):
    payload = _require_auth(request)
    user = db_get(
        "SELECT id, email, name, created_at as createdAt FROM users WHERE id = ?",
        (int(payload["sub"]),),
    )
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return {"user": user}


@app.post("/api/predict")
async def predict(request: Request, image: UploadFile = File(...)):
    img_bytes = await image.read()
    if not img_bytes:
        raise HTTPException(status_code=400, detail="Missing image file")

    try:
        result = predict_wound(img_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

    # Persist to DB
    prediction_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()

    user_id = None
    token = _token_from(request)
    if token:
        payload = decode_token(token)
        if payload and payload.get("sub"):
            found = db_get("SELECT id FROM users WHERE id = ?", (int(payload["sub"]),))
            if found:
                user_id = found["id"]

    db_run(
        """INSERT INTO predictions
           (id, user_id, predicted_class, confidence, all_probabilities_json,
            severity, model_version, inference_time_ms, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            prediction_id,
            user_id,
            result["predictedClass"],
            result["confidence"],
            json.dumps(result["allProbabilities"]),
            result["severity"],
            result["modelVersion"],
            result["inferenceTimeMs"],
            created_at,
        ),
    )
    return result


@app.get("/api/model/metrics")
def model_metrics():
    return generate_model_metrics()


@app.get("/api/analytics")
def analytics():
    ph = ",".join(["?" for _ in CLASSES])
    params = tuple(CLASSES)

    total_row = db_get(
        f"SELECT COUNT(*) as total, AVG(confidence) as avgConfidence FROM predictions WHERE predicted_class IN ({ph})",
        params,
    )
    total = int(total_row["total"]) if total_row else 0
    avg_conf = float(total_row["avgConfidence"] or 0) if total_row else 0.0

    class_rows = db_all(
        f"SELECT predicted_class as predictedClass, COUNT(*) as count FROM predictions WHERE predicted_class IN ({ph}) GROUP BY predicted_class",
        params,
    )
    class_dist = {cls: 0 for cls in CLASSES}
    for r in class_rows:
        if r["predictedClass"] in class_dist:
            class_dist[r["predictedClass"]] = int(r["count"])

    high_risk = sum(count for cls, count in class_dist.items() if SEVERITY_MAP.get(cls) == "high")
    high_risk_pct = (high_risk / total * 100) if total else 0

    recent_rows = db_all(
        f"""SELECT id, created_at as timestamp, predicted_class as predictedClass, confidence
            FROM predictions WHERE predicted_class IN ({ph})
            ORDER BY created_at DESC LIMIT 10""",
        params,
    )
    recent = [
        {
            "id": r["id"],
            "timestamp": r["timestamp"],
            "predictedClass": r["predictedClass"],
            "confidence": float(r["confidence"]),
            "severity": SEVERITY_MAP.get(r["predictedClass"], "unknown"),
        }
        for r in recent_rows
    ]

    def bucket(c: float) -> str:
        if c < 0.6: return "50-60%"
        if c < 0.7: return "60-70%"
        if c < 0.8: return "70-80%"
        if c < 0.9: return "80-90%"
        return "90-100%"

    conf_rows = db_all(
        f"SELECT confidence FROM predictions WHERE predicted_class IN ({ph})", params
    )
    buckets: dict = {}
    for r in conf_rows:
        b = bucket(float(r["confidence"]))
        buckets[b] = buckets.get(b, 0) + 1

    conf_dist = [
        {"range": r, "count": buckets.get(r, 0)}
        for r in ["50-60%", "60-70%", "70-80%", "80-90%", "90-100%"]
    ]

    daily_rows = db_all(
        f"""SELECT substr(created_at, 1, 10) as date,
                   COUNT(*) as count,
                   AVG(confidence) as avgConfidence
            FROM predictions
            WHERE predicted_class IN ({ph})
              AND substr(created_at, 1, 10) >= date('now', '-13 days')
            GROUP BY substr(created_at, 1, 10)
            ORDER BY date ASC""",
        params,
    )
    daily = [
        {"date": r["date"], "count": int(r["count"]), "avgConfidence": float(r["avgConfidence"] or 0)}
        for r in daily_rows
    ]

    return {
        "totalPredictions": total,
        "avgConfidence": avg_conf,
        "highRiskPercentage": high_risk_pct,
        "classDistribution": class_dist,
        "recentPredictions": recent,
        "confidenceDistribution": conf_dist,
        "dailyPredictions": daily,
    }
