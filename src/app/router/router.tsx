// app/providers/router.tsx
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "@/pages/Home/Home";
import LoginPage from "@/pages/Auth/Login";
import Layout from "@/widgets/Layout/Layout";
import AuthLayout from "@/widgets/Layout/AuthLayout";
import Signup from "@/pages/Auth/Signup";
// import DashboardPage from "@/pages/dashboard";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
