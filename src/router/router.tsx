import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/Home/Home";
import LoginPage from "@/pages/Auth/Login";
import InboxPage from "@/pages/Inbox/Inbox";
import AuthLayout from "@/components/layout/AuthLayout";
import Signup from "@/pages/Auth/Signup";
import { ProtectedRoute } from "./protectedRoute";

import DashboardPage from "@/pages/Dashboard/Dashboard";
import ProjectsPage from "@/pages/Projects/Projects";

import AccountPage from "@/pages/Account/Account";

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
        Component: DashboardPage,
        loader: () => headerLoader("Dashboard", "This is the main page"),
      },
      {
        path: "inbox",
        Component: InboxPage,
        loader: () => ({
          title: "Inbox",
          description:
            "These are your immediately actionable tasks. Focus on what you can do now.",
        }),
      },
      {
        path: "projects",
        Component: ProjectsPage,
        loader: () => ({
          title: "Projects",
          description: "Track your progress on larger initiatives.",
        }),
      },
      {
        path: "account",
        Component: AccountPage,
        loader: () => ({ title: "Settings" }),
      },
    ],
  },
]);
