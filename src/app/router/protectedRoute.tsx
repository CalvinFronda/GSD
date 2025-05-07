import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/features/auth/authContext";
import { ReactNode } from "react";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or skeleton screen
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
