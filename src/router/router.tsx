import { createBrowserRouter } from "react-router";

import AuthLayout from "@/components/layout/AuthLayout";
import Account from "@/pages/Account/Account";
import LoginPage from "@/pages/Auth/Login";
import Signup from "@/pages/Auth/Signup";
import Dashboard from "@/pages/Dashboard/Dashboard";
import HomePage from "@/pages/Home/Home";
import Inbox from "@/pages/Inbox/Inbox";

import { ProtectedRoute } from "./protectedRoute";

const Projects = () => <div>hello</div>;

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
        loader: () => ({
          title: "Inbox",
          description:
            "These are your immediately actionable tasks. Focus on what you can do now. ",
        }),
      },
      {
        path: "projects",
        Component: Projects,
        loader: () => ({
          title: "Projects",
          description: "Projects Page",
        }),
      },
      {
        path: "account",
        Component: Account,
        loader: () => ({ title: "Settings" }),
      },
    ],
  },
]);
