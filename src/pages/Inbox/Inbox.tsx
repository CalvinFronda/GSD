import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

import InboxItem from "@/components/ui/inbox-item";

const INBOX_PLACEHOLDER = "Add a new task, idea, or reminder...";

function Inbox() {
  return (
    <div>
      <div className="flex flex-row justify-between  bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
        <Input placeholder={INBOX_PLACEHOLDER} />
        <div className="flex pl-10">
          <Button>Add to Inbox</Button>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-medium text-gray-700">Unproccesed Items</h3>
          <div className="flex items-center space-x-2">
            <Button>Process All</Button>
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
        <InboxItem />
      </div>
    </div>
  );
}

export default Inbox;
