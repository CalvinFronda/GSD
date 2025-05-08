import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/main";

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      try {
        if (firebaseUser) {
          // TODO
          console.log("USER IS LOGGED IN");
          // if user exists in firestore
          // getDoc**
          // if not create user in firestore
          // else do nothing ( or add field to Usermodel called lastSeenAt and updated that as well as updatedAt)

          setUser(firebaseUser);
        } else {
          console.log("USER IS LOGGED OUT");
          setUser(null);
        }
      } catch (error) {
        console.error("error =", error);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
