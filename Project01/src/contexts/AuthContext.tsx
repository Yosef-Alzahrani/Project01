import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getMe, loginUser, registerUser, AuthUser } from '../utils/authService';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (input: {email: string; password: string;}) => Promise<void>;
  register: (input: {name?: string; email: string; password: string;}) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'medgrade_auth_token';

export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setToken(saved);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await getMe(token);
        setUser(res.user);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setUser(null);
      }
    };

    bootstrap();
  }, [token]);

  const value = useMemo<AuthContextType>(() => {
    return {
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login: async ({ email, password }) => {
        const res = await loginUser({ email, password });
        localStorage.setItem(STORAGE_KEY, res.token);
        setToken(res.token);
        setUser(res.user);
      },
      register: async ({ name, email, password }) => {
        const res = await registerUser({ name, email, password });
        localStorage.setItem(STORAGE_KEY, res.token);
        setToken(res.token);
        setUser(res.user);
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setUser(null);
      }
    };
  }, [user, token, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
