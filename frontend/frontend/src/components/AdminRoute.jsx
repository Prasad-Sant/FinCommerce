import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  // User must be logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Only ADMIN can access admin pages
  if (user.role !== "ADMIN" && user.role !== "ROLE_ADMIN") {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
};
