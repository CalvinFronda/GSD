import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/Home/Home";
import LoginPage from "@/pages/Auth/Login";

import AuthLayout from "@/components/layout/AuthLayout";
import Signup from "@/pages/Auth/Signup";
import { ProtectedRoute } from "./protectedRoute";
import Dashboard from "@/pages/Dashboard/Dashboard";

const Projects = () => <div>Projects</div>;

const Inbox = () => <div>Inbox</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "signup",
        Component: Signup,
      },
    ],
  },
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "inbox",
        Component: Inbox,
      },
      {
        path: "projects",
        Component: Projects,
      },
    ],
  },
]);
