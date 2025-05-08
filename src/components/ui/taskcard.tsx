import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";

interface TaskCardProps {
  title: string;
  description: string;
}

//
const TaskCard = ({ title, description }: TaskCardProps) => {
  const [completed, setCompleted] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardDescription>
          <div className="flex flex-row gap-2">
            <span> {completed ? "done" : "not done"} status</span>
            <span>difficulty</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>some random context</div>
        <Button onClick={() => setCompleted(true)}>Complete Task</Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
