// components/Sidebar.tsx
import { Home, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";

import { cn } from "@/lib/utils";

export default function Sidebar() {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", icon: <Home />, path: "/inbox" },
    { name: "Settings", icon: <Settings />, path: "/settings" },
  ];

  return (
    <div className="w-64 h-screen p-4 bg-muted shadow-md">
      <nav className="flex flex-col gap-2">
        {navItems.map(({ name, icon, path }) => (
          <Link
            key={name}
            to={path}
            className={cn(
              "flex items-center gap-2 p-2 rounded hover:bg-muted-foreground/10",
              location.pathname === path &&
                "bg-muted-foreground/20 font-semibold"
            )}
          >
            {icon}
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
