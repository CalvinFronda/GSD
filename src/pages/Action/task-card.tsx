import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardTaskCard from "../Dashboard/children/taskcard";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

interface TaskCardProps {
  task: Task;
  getPriorityColor: (priority: string) => string;
  isDragging?: boolean;
}

export function TaskCard({
  task,
  getPriorityColor,
  isDragging = false,
}: TaskCardProps) {
  return (
    <DashboardTaskCard
      task={task}
      getPriorityColor={getPriorityColor}
      isDragging={isDragging}
    />
  );
}
