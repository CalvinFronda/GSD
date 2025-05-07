import { Navigate } from "react-router";
import { useAuth } from "@/features/auth/authContext";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
