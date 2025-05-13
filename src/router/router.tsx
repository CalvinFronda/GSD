import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "@/pages/Home/Home";
import LoginPage from "@/pages/Auth/Login";
import Layout from "@/components/layout/Layout";
import AuthLayout from "@/components/layout/AuthLayout";
import Signup from "@/pages/Auth/Signup";
import { ProtectedRoute } from "./protectedRoute";
import Dashboard from "@/pages/Dashboard/Dashboard";
import { AuthProvider } from "@/features/auth/authContext";

export const AppRouter = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/inbox" element={<Dashboard />} />
          <Route path="/dashboard/action" element={<h1>Action</h1>} />
          <Route path="/dashboard/projects" element={<h1>Project</h1>} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
