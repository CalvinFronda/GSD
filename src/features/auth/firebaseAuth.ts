import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/shared/firebase/client";

export async function loginUser(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}
