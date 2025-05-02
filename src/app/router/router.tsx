// app/providers/router.tsx
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "@/pages/Home/Home";
import LoginPage from "@/pages/Login/Login";
import Layout from "@/widgets/Layout/Layout";
// import DashboardPage from "@/pages/dashboard";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
