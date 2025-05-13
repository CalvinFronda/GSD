import { createContext, useContext } from "react";

import { User } from "firebase/auth";

import { useInitApp } from "@/shared/firebase/client";
import { UserDataType } from "@/types";

interface AuthContextType {
  user: User | null;
  userData: UserDataType | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading, userData } = useInitApp();

  return (
    <AuthContext.Provider value={{ user, isLoading, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
