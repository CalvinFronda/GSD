import { Navigate, Outlet } from "react-router";

import Header from "@/pages/Dashboard/children/header";
import { useInitApp } from "@/shared/firebase/client";
import Loader from "@/components/ui/loader";

const ProtectedPage = ({ isLoading }: { isLoading: boolean }) => (
  <div>
    <Header />
    {!isLoading && <Outlet />}
  </div>
);

export const ProtectedRoute = () => {
  const { user, isLoading } = useInitApp();

  if (isLoading) {
    return <Loader />;
  }

  return user ? (
    <ProtectedPage isLoading={isLoading} />
  ) : (
    <Navigate to="/login" replace />
  );
};
