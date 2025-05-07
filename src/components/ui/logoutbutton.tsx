import { Button } from "./button";
import { signOut } from "firebase/auth";
import { auth } from "@/shared/firebase/client";

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut(auth);
  };
  return <Button onClick={handleLogout}>Logout</Button>;
}
