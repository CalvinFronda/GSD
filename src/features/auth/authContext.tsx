import { createContext, useContext } from "react";

import { useInitApp } from "@/shared/firebase/client";
import { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useInitApp();

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
