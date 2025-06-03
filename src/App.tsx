import { StrictMode } from "react";
import { RouterProvider } from "react-router";

import "./App.css";
import { AuthProvider } from "./features/auth/authContext.tsx";
import "./index.css";
import { router } from "./router/router.tsx";

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
