import { Button } from "../../../components/ui/button";
import { signOut } from "firebase/auth";

// TODO
export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut(auth);
  };
  return <Button onClick={handleLogout}>Logout</Button>;
}
