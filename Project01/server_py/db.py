import sqlite3
from pathlib import Path

DB_DIR = Path(__file__).parent / "data"
DB_PATH = DB_DIR / "app.sqlite"


def get_db_path() -> str:
    return str(DB_PATH)


def _conn():
    DB_DIR.mkdir(parents=True, exist_ok=True)
    c = sqlite3.connect(str(DB_PATH))
    c.row_factory = sqlite3.Row
    c.execute("PRAGMA journal_mode=WAL")
    return c


def init_db():
    c = _conn()
    c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT,
            created_at TEXT NOT NULL
        )
    """)
    c.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id TEXT PRIMARY KEY,
            user_id INTEGER,
            predicted_class TEXT NOT NULL,
            confidence REAL NOT NULL,
            all_probabilities_json TEXT NOT NULL,
            severity TEXT NOT NULL,
            model_version TEXT NOT NULL,
            inference_time_ms REAL NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    c.commit()
    c.close()


def db_get(query: str, params=()):
    c = _conn()
    row = c.execute(query, params).fetchone()
    c.close()
    return dict(row) if row else None


def db_all(query: str, params=()):
    c = _conn()
    rows = c.execute(query, params).fetchall()
    c.close()
    return [dict(r) for r in rows]


def db_run(query: str, params=()):
    c = _conn()
    c.execute(query, params)
    c.commit()
    c.close()
