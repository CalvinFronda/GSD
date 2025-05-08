import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/features/auth/authContext";
import Header from "@/pages/Dashboard/children/header";

const ProtectedPage = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <ProtectedPage /> : <Navigate to="/login" replace />;
};
