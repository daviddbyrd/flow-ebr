import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

export interface User {
  userId: string;
  exp: number;
  iat: number;
}

interface AuthContext {
  userId: string | null;
  exp: number | null;
  iat: number | null;
  isLoggedIn: boolean;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [exp, setExp] = useState<number | null>(null);
  const [iat, setIat] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("token");
        } else {
          setUserId(decodedToken.userId);
          setExp(decodedToken.exp);
          setIat(decodedToken.iat);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        exp,
        iat,
        isLoggedIn,
        setUserId,
        setIsLoggedIn,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext not found.");
  }
  return context;
};
