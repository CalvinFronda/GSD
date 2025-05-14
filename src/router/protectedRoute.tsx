import { Navigate, Outlet } from "react-router";

import Header from "@/pages/Dashboard/children/header";
import { useInitApp } from "@/shared/firebase/client";

const ProtectedPage = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export const ProtectedRoute = () => {
  const { user, isLoading } = useInitApp();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? <ProtectedPage /> : <Navigate to="/login" replace />;
};
