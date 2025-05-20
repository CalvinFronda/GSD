import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/features/auth/authContext";
import Header from "@/pages/Dashboard/children/header";
import { Loading } from "@/components/ui/loading";

const ProtectedPage = ({ isLoading }: { isLoading: boolean }) => (
  <div>
    <Header />
    {!isLoading && <Outlet />}
  </div>
);

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return user ? (
    <ProtectedPage isLoading={isLoading} />
  ) : (
    <Navigate to="/login" replace />
  );
};
