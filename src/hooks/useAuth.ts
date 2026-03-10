import { useState, useEffect } from "react";
import { LoginSchema, UserSchema, type User, type LoginFormData } from "../types";

const STORAGE_KEY = 'food_dashboard_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  const login = (credentials: LoginFormData) => {
    const validatedUser = LoginSchema.parse(credentials);
    const mockUser: User = {
      id: 1,
      email: validatedUser.email,
      token: 'mock-jwt-token-' + Date.now(),
      isLoggedIn: true,
      role: validatedUser.role || 'staff'
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
  }
  
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return {
    user,
    loading,
    login,
    logout
  }
}