import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../../components/ui/button";

import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import { TaskStatus } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/store/useTaskStore";
import AlertDialogButton from "@/components/layout/AlertDialog";
import { useRef, useState } from "react";
import { TaskType } from "@/store/useTaskStore";

const isCompleted = (status: TaskStatus) =>
  status === TASK_STATUS_TYPE.COMPLETED;

interface TaskCardProps {
  task: TaskType;
  getPriorityColor?: (priority: string) => string;
  isDragging?: boolean;
  className?: string;
}
const TaskCard = ({
  task,
  getPriorityColor,
  isDragging,
  className,
}: TaskCardProps) => {
  const { content, status, difficulty } = task;
  const [showSettings, setShowSettings] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { openTaskDialog, deleteTask, archiveTask, duplicateTask } =
    useTaskStore();

  const handleDeleteTask = () => {
    if (task?.id) {
      deleteTask(task.id);
      setShowDeleteDialog(false);
    }
  };

  const handleMouseLeave = (e) => {
    // Check if the mouse is moving to the dropdown
    if (dropdownRef.current && dropdownRef.current.contains(e.relatedTarget)) {
      return; // Don't hide settings if mouse is moving to dropdown
    }

    // Only hide settings if dropdown is not open
    if (!isDropdownOpen) {
      setShowSettings(false);
    }
  };

  return (
    <>
      <Card
        className={cn(
          `max-h-80 max-w-80 relative flex flex-col justify-between cy p-6 ${isDragging ? "shadow-lg" : ""}`,
          className
        )}
        ref={cardRef}
        onMouseEnter={() => setShowSettings(true)}
        onMouseLeave={handleMouseLeave}
      >
        {showSettings && (
          <div className="absolute top-4 right-4 z-10">
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={(open) => setIsDropdownOpen(open)}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openTaskDialog(task)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => duplicateTask(task)}>
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => archiveTask(task)}>
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <CardHeader className="space-y-4 px-0">
          <CardTitle className="min-h-10 pr-3  sm:text-xs md:text-sm">
            {content.title}
          </CardTitle>
          <CardDescription>
            <div className="flex flex-row gap-4">
              <Badge>Status: {isCompleted(status) ? "Done" : "Not Done"}</Badge>
              <Badge>Difficulty: {difficulty}</Badge>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 px-0">{content.description}</CardContent>

        <CardFooter className=" pt-4 px-0 pb-0"></CardFooter>
      </Card>

      <AlertDialogButton
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onDelete={handleDeleteTask}
      />
    </>
  );
};

export default TaskCard;
