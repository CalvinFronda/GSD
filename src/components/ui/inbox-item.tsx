import { Checkbox } from "@/components/ui/checkbox";
import { FolderInput, Star, TrashIcon } from "lucide-react";
import { TaskDialog } from "@/pages/Dashboard/children/addtaskdialog";
import { Button } from "./button";

interface InboxItem {
  title: string;
  description: string;
}

function InboxItem({ title, description }: InboxItem) {
  return (
    <li className="p-4 hover:bg-gray-50 transition-colors duration-150 list-none">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-1">
          <Checkbox className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-grow">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-900">
              Call insurance company about claim
            </p>
            <span className="text-xs text-gray-500">2h ago</span>
          </div>
          <div className="mt-1">
            <p className="text-sm text-gray-600">
              Need to follow up on claim #12345 for the car accident
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 ml-8 flex items-center space-x-2">
        <TaskDialog btnTitle="Process" />

        <div className="flex items-center space-x-2">
          <Button
            className="hover:text-blue-500 transition-colors duration-200"
            variant="ghost"
            size="icon"
          >
            <FolderInput />
          </Button>

          <Button
            className="hover:text-yellow-500 transition-colors duration-200"
            variant="ghost"
            size="icon"
          >
            <Star />
          </Button>
          <Button
            className=" hover:text-red-500 transition-colors duration-200"
            variant="ghost"
            size="icon"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default InboxItem;
