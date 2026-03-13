import { createContext, useContext } from 'react';
import { type User, type LoginFormData, type LoginResult } from '../models';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginFormData) => LoginResult;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside <AuthProvider>');
  return ctx;
}
