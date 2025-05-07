import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
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
      <div className="absolute right-8 flex items-center space-x-4">
        <Separator orientation="vertical" className="h-6 bg-white" />
        <Avatar className="bg-white text-gray-700">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
