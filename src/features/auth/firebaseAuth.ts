import { auth } from "../../shared/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
