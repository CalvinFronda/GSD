import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./app/App.tsx";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import firebaseApp from "@/shared/firebase/client";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, db, auth };

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>{firebaseApp ? <App /> : <></>}</StrictMode>
);
