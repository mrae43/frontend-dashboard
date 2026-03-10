import { useState, useEffect } from "react";
import { LoginSchema, UserSchema, type User } from "../types";

const STORAGE_KEY = 'food_dashboard_user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = UserSchema.parse(JSON.parse(stored));
        setUser(parsed);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, [])

  const login = (user: User) => {
    const validatedUser = LoginSchema.parse(user);
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