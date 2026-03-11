import { useState, useEffect } from "react";
import { LoginSchema, UserSchema, type User, type LoginFormData, type LoginResult } from "../models";

const STORAGE_KEY = 'food_dashboard_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const validated = UserSchema.parse(parsed);
        setUser(validated);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Invalid stored user:', err.message);
        }
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, [])

  const login = (credentials: LoginFormData): LoginResult => {
    try {
      const result = LoginSchema.safeParse(credentials);
      if (!result.success) {
        return { success: false, error: result.error };
      }

      const validated = result.data as LoginFormData;
      const mockUser: User = {
        id: 1,
        email: validated.email,
        token: `mock-jwt-${Date.now()}`,
        isLoggedIn: true,
        role: validated.role || 'staff',
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      setError(null);
      return { success: true, user: mockUser };
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Login failed');
      return { success: false, error };
    }
  }
  
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setError(null);
  }

  return {
    user,
    loading,
    error,
    login,
    logout
  }
}