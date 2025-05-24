import { createContext, useContext } from "react";
import type { ReactNode } from "react";

interface AuthContext {
  userId: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return;
  }
  return { context };
};
