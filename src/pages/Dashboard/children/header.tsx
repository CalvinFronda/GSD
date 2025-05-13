import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";
import { useAuth } from "@/features/auth/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/shared/firebase/client";
import { DropdownMenu } from "../../../components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserInitals } from "@/lib/utils";

export default function Header() {
  const navigate = useNavigate();
  const { isLoading, userData } = useAuth();
  const handleLogout = async () => {
    await signOut(auth);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const userIcon =
    userData && getUserInitals(userData?.firstName, userData?.lastName);

  return (
    <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between bg-gray-700 text-white px-8 py-4 rounded-xl shadow-lg">
      <div className="flex-1 flex justify-center space-x-6">
        <Button
          variant="ghost"
          onClick={() => navigate("dashboard/inbox")}
          className="text-white font-semibold"
        >
          Inbox
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/projects")}
          className="text-white font-semibold"
        >
          Projects
        </Button>
      </div>
      <div className="absolute right-8 flex items-center space-x-4 z-100">
        <Separator orientation="vertical" className="h-6 bg-white" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="text-black">{userIcon}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
