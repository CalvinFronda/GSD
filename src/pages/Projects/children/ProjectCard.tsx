import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProjectType } from "@/store/useProjectStore";

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const [progress, setProgress] = useState(13);

  const { title, dueDate, description, labels } = project;

  return (
    <Card className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-start">
            <h3 className="font-medium  text-lg">{title}</h3>
            <div className="flex">
              <Button type="button" size="icon" variant="ghost">
                <Pencil />
              </Button>
              <Button type="button" size="icon" variant="ghost">
                <Trash />
              </Button>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            {labels.map((x) => (
              <div className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full ">
                {x}
              </div>
            ))}

            <div className="ml-2 text-sm">
              {dueDate ? dueDate : "No due date"}
            </div>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">Progress: 60%</div>
            <div className="text-sm text-gray-600">3/5 tasks</div>
          </div>
          <Progress value={progress} />
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="task" />
            <label
              htmlFor="task"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Create somethign
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">+ Add task</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
