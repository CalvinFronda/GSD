import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/features/auth/authContext";
import Header from "@/components/ui/header";

const ProtectedPage = () => (
  <div>
    <Header />
    <div className="flex flex-col w-100 pt-28">
      <Outlet />
    </div>
  </div>
);

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <ProtectedPage /> : <Navigate to="/login" replace />;
};
