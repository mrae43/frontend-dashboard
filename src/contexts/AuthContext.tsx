import { createContext, useContext, type ReactNode } from "react";
import { type User, type LoginFormData, type LoginResult } from "../models";
import { useAuth } from "../hooks/useAuth";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginFormData) => LoginResult;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside <AuthProvider>");
  return ctx;
}
