import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const authData = localStorage.getItem("superAdminAuth");

  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;