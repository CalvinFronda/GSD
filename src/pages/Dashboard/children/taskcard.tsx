import { Settings } from "lucide-react";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTaskStore } from "@/store/useTaskStore";
import { TaskType } from "@/store/useTaskStore";

import AlertDialogButton from "@/components/layout/AlertDialog";
import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import { TaskStatus } from "@/types";

import { Button } from "../../../components/ui/button";

const isCompleted = (status: TaskStatus) =>
  status === TASK_STATUS_TYPE.COMPLETED;

const TaskCard = ({ task }: { task: TaskType }) => {
  const { content, status, difficulty } = task;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    openTaskDialog,
    deleteTask,
    archiveTask,
    duplicateTask,
    closeTaskDialog,
  } = useTaskStore();

  // Close dropdown when delete dialog opens
  useEffect(() => {
    if (showDeleteDialog) {
      setIsDropdownOpen(false);
      closeTaskDialog();
    }
  }, [showDeleteDialog, closeTaskDialog]);

  const handleEdit = () => {
    openTaskDialog(task);
    setIsDropdownOpen(false);
  };

  const handleDuplicate = () => {
    duplicateTask(task);
    setIsDropdownOpen(false);
  };

  const handleArchive = () => {
    archiveTask(task);
    setIsDropdownOpen(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
    setIsDropdownOpen(false);
  };

  // Handler for confirming delete (actual deletion)
  const handleDeleteConfirm = () => {
    if (task?.id) {
      deleteTask(task.id);
      setShowDeleteDialog(false);
    }
  };
  // If the delete dialog is open, close the menu button

  return (
    <>
      <Card className="min-h-80 min-w-sm relative ">
        <div className="absolute top-4 right-4 z-10">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleArchive}>
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={handleDeleteClick}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardHeader className="space-y-4 px-0 pt-0">
          <CardTitle className="min-h-10  pr-3">{content.title}</CardTitle>
          <CardDescription>
            <div className="flex flex-row gap-4">
              <Badge>Status: {isCompleted(status) ? "Done" : "Not Done"}</Badge>
              <Badge>Difficulty: {difficulty}</Badge>
            </div>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 px-0">{content.description}</CardContent>

        <CardFooter className=" pt-4 px-0 pb-0">
          <Button className="w-full">Complete Task</Button>
        </CardFooter>
      </Card>

      <AlertDialogButton
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onDelete={handleDeleteConfirm}
      />
    </>
  );
};

export default TaskCard;
