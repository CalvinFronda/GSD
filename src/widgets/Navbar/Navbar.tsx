import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 ">
      <div className="flex h-14 items-center justify-between mx-5">
        <div className="font-bold text-xl">GSD</div>
        <NavLink to="/login">
          <Button variant="default" size="default">
            Login
          </Button>
        </NavLink>
      </div>
    </header>
  );
}
