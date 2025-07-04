import { createBrowserRouter } from "react-router";

import AuthLayout from "@/components/layout/AuthLayout";
import AccountPage from "@/pages/Account/Account";
import LoginPage from "@/pages/Auth/Login";
import Signup from "@/pages/Auth/Signup";
import DashboardPage from "@/pages/Dashboard/Dashboard";
import HomePage from "@/pages/Home/Home";
import InboxPage from "@/pages/Inbox/Inbox";
import NextActionPage from "@/pages/NextActions/NextAction";
import ProjectsPage from "@/pages/Projects/Projects";
import SomedayPage from "@/pages/Someday/Someday";

import { ProtectedRoute } from "./protectedRoute";

const InboxAll = () => <InboxPage filterType="all" />;
const InboxProcessed = () => <InboxPage filterType="processed" />;
const InboxUnprocessed = () => <InboxPage filterType="unprocessed" />;

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
        loader: () => ({
          title: "Dashboard",
          description: "This is the main page",
        }),
      },
      {
        path: "inbox",
        Component: InboxAll,
        loader: () => ({
          title: "Inbox",
          description: "These are your all of your tasks.",
        }),
      },
      {
        path: "processed",
        Component: InboxProcessed,
        loader: () => ({
          title: "Inbox",
          description: "These are your all of your tasks.",
        }),
      },
      {
        path: "unproccesed",
        Component: InboxUnprocessed,
        loader: () => ({
          title: "Inbox",
          description: "These are your all of your tasks.",
        }),
      },
      {
        path: "next-actions",
        Component: NextActionPage,
        loader: () => ({
          title: "Next Actions",
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
        path: "someday",
        Component: SomedayPage,
        loader: () => ({
          title: "Someday/Maybe",
          description:
            "Maybe you just don't have time right now. Track it and work on it when you have more time!",
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
