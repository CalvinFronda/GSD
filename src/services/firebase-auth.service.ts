import { COLLECTIONS } from "@/constants/firestore.constants";
import { db, auth } from "@/shared/firebase/client";
import { User } from "@/models";
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
        password,
      );
      return user;
    } catch (error) {
      console.error("error =", error);
      return null;
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("error =", error);
      return null;
    }
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      const newUser = new User(email, firstName, lastName);

      const userDoc = doc(db, COLLECTIONS.USERS, user.uid);
      await setDoc(userDoc, newUser.asObject());
      return user;
    } catch (error) {
      console.error("error = ", error);
    }
  }

  me() {
    return this.auth.currentUser;
  }
}

export default FirebaseAuth;
