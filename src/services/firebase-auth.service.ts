import { auth } from "@/main";
import { Auth, signInWithEmailAndPassword, signOut } from "firebase/auth";

class FirebaseAuth {
  auth: Auth;

  constructor() {
    this.auth = auth;
  }

  async loginUser(email: string, password: string) {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (error) {
      console.error("error =", error);
      return null;
    }
  }

  // TODO: signOut()
  async signOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("error =", error);
      return null;
    }
  }

  // TODO: createUser()
}

export default FirebaseAuth;
