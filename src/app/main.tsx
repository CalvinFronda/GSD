import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { AppRouter } from "./router/router.tsx";
const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
