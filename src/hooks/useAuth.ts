import { useState } from 'react';
import { LoginSchema, UserSchema, type User, type LoginFormData, type LoginResult } from '../models';

const STORAGE_KEY = 'loyalty_pulse_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const validated = UserSchema.parse(parsed);
        return validated;
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Invalid stored user:', err.message);
        }
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = (credentials: LoginFormData): LoginResult => {
    setLoading(true);
    try {
      const result = LoginSchema.safeParse(credentials);
      if (!result.success) {
        return { success: false, error: result.error.message };
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
      const error = err instanceof Error ? err.message : 'Login failed';
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setError(null);
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
  };
}