import { BookMarked, FolderInput, TrashIcon } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

import { TaskType, useTaskStore } from "@/store/useTaskStore";

import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import { timeAgo } from "@/lib/time";
import { ProcessDialog } from "@/pages/Inbox/children/processDialog";

import LocalToolTip from "./app-tooltip";
import { Button } from "./button";

function InboxItem({ task }: { task: TaskType }) {
  const { title, description } = task.content;
  const { createdAt } = task;
  const { updateTaskState, deleteTask } = useTaskStore();

  const handleSendSomeday = () => {
    updateTaskState(task, TASK_STATUS_TYPE.SOMEDAY);
  };

  const handleDeleteTask = () => {
    if (!task.id) return;
    deleteTask(task.id);
  };

  return (
    <li className="p-4 hover:bg-gray-50 transition-colors duration-150 list-none">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-1">
          <Checkbox className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-grow">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <span className="text-xs text-gray-500">{timeAgo(createdAt)}</span>
          </div>
          <div className="mt-1">
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
      <div className="mt-2 ml-8 flex items-center space-x-2">
        <ProcessDialog task={task} />

        <div className="flex items-center space-x-2">
          <LocalToolTip content="Someday">
            <Button
              className="hover:text-blue-500 transition-colors duration-200"
              variant="ghost"
              size="icon"
              onClick={() => handleSendSomeday()}
            >
              <FolderInput />
            </Button>
          </LocalToolTip>
          <LocalToolTip content="Reference">
            <Button
              className="hover:text-yellow-500 transition-colors duration-200"
              variant="ghost"
              size="icon"
            >
              <BookMarked />
            </Button>
          </LocalToolTip>
          <LocalToolTip content="Delete">
            <Button
              className=" hover:text-red-500 transition-colors duration-200"
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteTask()}
            >
              <TrashIcon />
            </Button>
          </LocalToolTip>
        </div>
      </div>
    </li>
  );
}

export default InboxItem;
