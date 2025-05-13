import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const isAuthenticated = (): boolean => {
  return !!Cookies.get("token") || !!localStorage.getItem("token");
};
// PrivateRoute: Protects routes for authenticated users only
export const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

// PublicRoute: Restricts routes to unauthenticated users only
export const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to="/profile" replace /> : <Outlet />;
};
