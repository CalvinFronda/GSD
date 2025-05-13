import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../../components/ui/button";
import type { Task } from "@/models";
import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import { TaskStatus } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { useUIStore } from "@/hooks/useUiStore";

interface TaskCardProps {
  task: Task;
}

const isCompleted = (status: TaskStatus) =>
  status === TASK_STATUS_TYPE.COMPLETED;
/**
 * TODO:
 * Edit a task
 * Duplicate
 * Archive
 * Delete
 */
const TaskCard = ({ task }: TaskCardProps) => {
  const { content, status, difficulty } = task;

  const { openTaskDialog } = useUIStore();

  return (
    <Card className="min-h-80 min-w-80 relative">
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
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
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription className="max-h-35 overflow-y-auto">
          {content.description}
        </CardDescription>
        <CardDescription>
          <div className="flex flex-row gap-2">
            <span> {isCompleted(status) ? "done" : "not done"} status</span>
            <span>difficulty: {difficulty}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>{/* <div>some random context</div> */}</CardContent>
      <CardFooter>
        <Button>Complete Task</Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
