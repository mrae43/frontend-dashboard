import { AuthContext } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { type ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}