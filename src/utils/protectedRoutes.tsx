import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoutes({ allowedRoles }: { allowedRoles?: string[] }) {
  const { accessToken, role, loading } = useAuth();
  const location = useLocation();

  // Show nothing or a simple loading div while checking token
  if (loading) {
    return null; // or a spinner component
  }

  // No token? Redirect to login
  if (!accessToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Token exists but role is not allowed? Redirect to unauthorized page
  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/unauthorised" state={{ from: location }} replace />;
  }

  // Token exists and role is allowed → render child routes
  return <Outlet />;
}

export default ProtectedRoutes;
