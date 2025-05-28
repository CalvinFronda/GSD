import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/Home/Home";
import LoginPage from "@/pages/Auth/Login";

import AuthLayout from "@/components/layout/AuthLayout";
import Signup from "@/pages/Auth/Signup";
import { ProtectedRoute } from "./protectedRoute";
import Dashboard from "@/pages/Dashboard/Dashboard";

const Projects = () => <div>hello</div>;

const Inbox = () => <div>world</div>;

function headerLoader(title: string, description: string) {
  return {
    title: title,
    description: description,
  };
}

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
        loader: () => headerLoader("Dashboard", "This is the main page"),
      },
      {
        path: "inbox",
        Component: Inbox,
        loader: () => ({ title: "Inbox", description: "Inbox Page" }),
      },
      {
        path: "projects",
        Component: Projects,
        loader: () => ({ title: "Projects", description: "Projects Page" }),
      },
    ],
  },
]);
