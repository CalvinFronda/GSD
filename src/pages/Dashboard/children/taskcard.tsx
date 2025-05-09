import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import type { Task } from "@/models";
export enum TaskStatus {
  NOT_STRTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

const isCompleted = (status: TaskStatus) => status === TaskStatus.COMPLETED;
// TODO
const TaskCard = ({ task }: { task: Task }) => {
  const { content, status, difficulty } = task;
  return (
    <Card className="min-h-80  min-w-80">
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
