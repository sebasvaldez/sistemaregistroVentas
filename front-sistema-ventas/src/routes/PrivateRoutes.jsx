import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/Authcontext";

export const PrivateRoutes = ({ children, isLogged }) => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (!loading && !isLogged) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!isLogged && loading) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
