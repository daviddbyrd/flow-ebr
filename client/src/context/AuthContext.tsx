import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  exp: number;
  iat: number;
}

interface AuthContext {
  user: User | null;
  isLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.remove("token");
        } else {
          setUser(decodedToken);
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
      value={{ user, isLoggedIn, setUser, setIsLoggedIn, isLoading }}
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
