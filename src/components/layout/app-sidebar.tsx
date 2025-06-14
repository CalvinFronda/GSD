import { ChevronUp, User2 } from "lucide-react";

import { NavLink, useNavigate } from "react-router";

import { signOut } from "firebase/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useAuth } from "@/features/auth/authContext";

import { cn } from "@/lib/utils";
import { sidebarItems } from "@/router/sidebarRoutes";
import { auth } from "@/shared/firebase/client";

export function AppSidebar() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="p-3 border-gray-200">
            <SidebarGroupLabel className="text-xl font-bold text-gray-800">
              GTD Dashboard
            </SidebarGroupLabel>
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors w-full",
                          isActive
                            ? "bg-muted text-foreground"
                            : "hover:bg-muted/50 text-muted-foreground",
                        )
                      }
                    >
                      <>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="h-10">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {userData?.firstName} {userData?.lastName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/account")}>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
