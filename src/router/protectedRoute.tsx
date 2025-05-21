import { Navigate, Outlet, useMatches, UIMatch } from "react-router";
import { useInitApp } from "@/shared/firebase/client";
import Loader from "@/components/ui/loader";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

interface RouteData {
  title: string;
  description: string;
}

interface MatchesType extends UIMatch {
  data: RouteData;
}

const ProtectedPage = ({ isLoading }: { isLoading: boolean }) => {
  const matches = useMatches() as MatchesType[];

  const lastMatchWithData = [...matches].reverse().find((m) => m.data?.title);
  const title = lastMatchWithData?.data.title || "Default Title";
  const description = lastMatchWithData?.data.description || "";

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <header className="px-4 lg:px-6">
            <div className="flex flex-col gap-5 pb-5">
              <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {title}
              </h2>
              <p className="text-xl text-muted-foreground">{description}</p>
            </div>
          </header>
          {!isLoading && <Outlet />}
        </main>
      </SidebarProvider>
    </div>
  );
};

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
