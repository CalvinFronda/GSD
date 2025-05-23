import { StrictMode } from "react";
import "./App.css";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.tsx";
import { AuthProvider } from "./features/auth/authContext.tsx";

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  );
}

export default App;
