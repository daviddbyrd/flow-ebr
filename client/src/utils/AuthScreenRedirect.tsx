import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthScreen from "../components/Auth/AuthScreen";

const AuthScreenRedirect: React.FC = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  return <AuthScreen />;
};

export default AuthScreenRedirect;
