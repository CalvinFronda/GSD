import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { User } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { UserDataType } from "@/types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_APP_ID,
};

interface AppSettings {
  theme: "light" | "dark";
  language: string;
  lastVisited: string;
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const defaultSettings = {
  theme: "light",
  language: "en",
  lastVisited: new Date().toISOString(),
};

/**
 Initializes Firebase authentication and app settings.
 * 
 * - Tracks global auth state (user, loading)
 * - Loads settings from localStorage if available
 * - Persists updated settings to localStorage
 */
function useInitFirebase() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [settings, setSettings] = useState<AppSettings>(() => {
    const savedSettings = localStorage.getItem("appSettings");
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserDataType);
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    // Save settings to localStorage whenever they change
    localStorage.setItem("appSettings", JSON.stringify(settings));
    return () => unsubscribe();
  }, []);

  // Update settings
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
      lastVisited: new Date().toISOString(),
    }));
  };

  return { user, userData, isLoading, settings, updateSettings };
}

/**
 * Sets global HTML attributes based on app settings.
 *
 * - Applies theme and language to <html> tag
 * - Depends on settings initialized from Firebase
 */
function useInitApp() {
  const { user, userData, isLoading, settings, updateSettings } =
    useInitFirebase();

  useEffect(() => {
    // Set initial theme
    document.documentElement.setAttribute("data-theme", settings.theme);

    // Set initial language
    document.documentElement.setAttribute("lang", settings.language);
  }, [settings]);

  return {
    isLoading,
    user,
    userData,
    settings,
    updateSettings,
  };
}

export { firebaseApp, db, auth, useInitApp, useInitFirebase };
