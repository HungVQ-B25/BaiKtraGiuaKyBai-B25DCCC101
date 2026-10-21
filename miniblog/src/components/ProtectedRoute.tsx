import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ user }: { user: string }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}