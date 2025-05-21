import { Navigate, Outlet } from "react-router";
import { useInitApp } from "@/shared/firebase/client";
import Loader from "@/components/ui/loader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

const ProtectedPage = ({ isLoading }: { isLoading: boolean }) => (
  <div>
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {!isLoading && <Outlet />}
      </main>
    </SidebarProvider>
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
