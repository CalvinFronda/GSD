import { Outlet } from "react-router";
import NavBar from "../Navbar/Navbar";

const Layout = () => {
  return (
    <div>
      <NavBar />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
