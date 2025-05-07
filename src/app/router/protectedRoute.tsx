import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/features/auth/authContext";
import Header from "@/components/ui/header";

const ProtectedPage = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or skeleton screen
  }

  return user ? <ProtectedPage /> : <Navigate to="/login" replace />;
};
