import { auth } from "@/main";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}
