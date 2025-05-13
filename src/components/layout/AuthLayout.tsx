import { Outlet } from "react-router";
import { NavLink } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <header className="z-50 w-full ">
        <div className="flex h-14 items-center justify-between mx-5">
          <div className="font-bold text-xl">
            <NavLink to="/">GSD</NavLink>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
