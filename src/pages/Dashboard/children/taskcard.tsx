import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

interface TaskCardProps {
  title: string;
  description: string;
}

// TODO
const TaskCard = ({ title, description }: TaskCardProps) => {
  const [completed, setCompleted] = React.useState(false);

  return (
    <Card className="min-h-80  min-w-80">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-h-35 overflow-y-auto">
          {description}
        </CardDescription>
        <CardDescription>
          {/* <div className="flex flex-row gap-2">
            <span> {completed ? "done" : "not done"} status</span>
            <span>difficulty</span>
          </div> */}
        </CardDescription>
      </CardHeader>
      <CardContent>{/* <div>some random context</div> */}</CardContent>
      <CardFooter>
        <Button onClick={() => setCompleted(true)}>Complete Task</Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
