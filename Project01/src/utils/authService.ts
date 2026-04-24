const API_BASE_URL =
  String(import.meta.env.VITE_API_BASE_URL || '')
    .trim()
    .replace(/\/$/, '');

type Json = Record<string, any>;

export interface AuthUser {
  id: number;
  email: string;
  name?: string | null;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as Json;
    if (typeof data?.error === 'string') return data.error;
    if (typeof data?.message === 'string') return data.message;
  } catch {
    // ignore
  }
  return `${res.status} ${res.statusText}`;
}

export async function registerUser(input: {
  name?: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }

  return res.json();
}

export async function loginUser(input: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }

  return res.json();
}

export async function getMe(token: string): Promise<{user: AuthUser;}> {
  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }

  return res.json();
}
