import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, X } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { ProjectType, useProjectStore } from "@/store/useProjectStore";
import TasksFirestoreService from "@/services/db/tasks.firestore.service";
import { useAuth } from "@/features/auth/authContext";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
});

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const [progress, setProgress] = useState(13);
  const [addTaskBtn, setAddTaskBtn] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addTaskToProject } = useProjectStore();
  const { user } = useAuth();
  const { id, title, dueDate, description, labels } = project;
  console.log("Im card", project);

  const handleCreateTask = async () => {
    const parsed = taskSchema.safeParse({ title: taskInput });
    if (!parsed.success) {
      console.error(parsed.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    const service = new TasksFirestoreService();
    try {
      if (!user?.uid) return;
      if (!id) return;
      if (!project.id) return;
      const newTask = await service.createTask(user?.uid, {
        title: parsed.data.title,
        projectId: id,
        status: "IN_PROGRESS",
      });
      if (!newTask) return;

      addTaskToProject(project.id, newTask);
      setTaskInput("");
      setAddTaskBtn(false);

      const completedTasks = project.tasks.filter(
        (task) => task.status === "COMPLETED",
      ).length;
      const totalTasks = project.tasks.length + 1;
      setProgress((completedTasks / totalTasks) * 100);
      // optionally refetch project tasks here
    } catch (error) {
      console.error("Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg">{title}</h3>
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
            {labels.map((label, i) => (
              <div
                key={i}
                className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {label}
              </div>
            ))}
            <div className="ml-2 text-sm">{dueDate || "No due date"}</div>
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

        {/* Placeholder task example */}
        <div className="p-4">
          {project.tasks &&
            project.tasks.map((task) => (
              <div className="flex items-center space-x-2">
                {/*On click should update task status to "completed" or "uncomplete" */}
                <Checkbox id="task" />
                <label
                  htmlFor="task"
                  className="text-sm font-medium leading-none"
                >
                  {task.content.title}
                </label>
              </div>
            ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        {addTaskBtn ? (
          <div className="flex w-full gap-2 items-center">
            <Input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Enter task title"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateTask();
              }}
              disabled={isLoading}
            />
            <Button size="icon" onClick={handleCreateTask} disabled={isLoading}>
              +
            </Button>
            <X
              className="cursor-pointer"
              color="red"
              onClick={() => setAddTaskBtn(false)}
            />
          </div>
        ) : (
          <Button variant="ghost" onClick={() => setAddTaskBtn(true)}>
            + Add task
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
