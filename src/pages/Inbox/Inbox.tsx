import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InboxItem from "@/components/ui/inbox-item";
import { useTaskStore } from "@/store/useTaskStore";
import { useFetchTasks } from "@/hooks/useFetchTasks";

import InboxForm from "./children/inboxform";

function Inbox() {
  const tasks = useTaskStore((s) => s.tasks);
  useFetchTasks();

  return (
    <div>
      <div className="flex flex-row justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
        <InboxForm />
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-medium text-gray-700">Unproccesed Items</h3>
          <div className="flex items-center space-x-2">
            {/* <Button>Process All</Button> */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className=" text-gray-500 hover:text-gray-700 focus:outline-none">
                    <EllipsisVertical />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" className="w-56">
                  <DropdownMenuItem>Sort by Date</DropdownMenuItem>
                  <DropdownMenuItem>Sort by Priortiy</DropdownMenuItem>
                  <DropdownMenuItem>Archived Processed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        {tasks.map((task, i) => (
          <InboxItem key={i} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Inbox;
