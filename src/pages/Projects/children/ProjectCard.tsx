import { useEffect, useState } from "react";
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
import { ProjectType } from "@/store/useProjectStore";
import TasksFirestoreService from "@/services/db/tasks.firestore.service";
import { useAuth } from "@/features/auth/authContext";
import {
  PROJECT_STATUS_TYPE,
  TASK_STATUS_TYPE,
} from "@/constants/firestore.constants";

import { TaskType, useTaskStore } from "@/store/useTaskStore";
import Loader from "@/components/ui/loader";
import { useFetchTasks } from "@/hooks/useFetchTasks";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
});

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const [progress, setProgress] = useState(0);
  const [addTaskBtn, setAddTaskBtn] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useFetchTasks();
  const { user } = useAuth();
  const { id, title, dueDate, description, labels } = project;
  const { tasks } = useTaskStore((s) => s);
  const filteredTask = tasks.filter((task) => task.projectId === project.id);

  const service = new TasksFirestoreService();
  const completedTasks = filteredTask.filter(
    (task) => task.status === "COMPLETED",
  ).length;

  const totalTasks = filteredTask.length;

  const handleCreateTask = async () => {
    const parsed = taskSchema.safeParse({ title: taskInput });
    if (!parsed.success) {
      console.error(parsed.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      if (!user?.uid) return;
      if (!id) return;
      if (!project.id) return;
      const newTask = await service.createTask(user?.uid, {
        title: parsed.data.title,
        projectId: id,
        status: PROJECT_STATUS_TYPE.IN_PROGRESS,
      });
      if (!newTask) return;

      setTaskInput("");
      setAddTaskBtn(false);

      setProgress((completedTasks / totalTasks) * 100);
    } catch (error) {
      console.error("Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  async function handleCheckTask(task: TaskType) {
    if (!task.id) return;

    try {
      const service = new TasksFirestoreService();

      // Toggle the status
      const newStatus =
        task.status === TASK_STATUS_TYPE.COMPLETED
          ? TASK_STATUS_TYPE.IN_PROGRESS
          : TASK_STATUS_TYPE.COMPLETED;

      // Update task in Firestore
      await service.update(task.id, {
        status: newStatus,
        completedAt:
          newStatus === TASK_STATUS_TYPE.IN_PROGRESS
            ? null
            : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Update local tasks state
      const updatedTasks = tasks.map((t: TaskType) =>
        t.id === task.id ? { ...t, status: newStatus } : t,
      );

      // Update progress
      const newCompletedCount = updatedTasks.filter(
        (t) => t.status === TASK_STATUS_TYPE.COMPLETED,
      ).length;
      setProgress((newCompletedCount / updatedTasks.length) * 100);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  useEffect(() => {
    setProgress((completedTasks / totalTasks) * 100 || 0);
  }, [progress]);

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
            <div className="text-sm text-gray-600">
              Progress: {Math.round(progress)} %
            </div>
            <div className="text-sm text-gray-600">
              {
                filteredTask.filter((task) => task.status === "COMPLETED")
                  .length
              }
              /{filteredTask.length} tasks
            </div>
          </div>
          <Progress value={progress} />
        </div>

        {/* Placeholder task example */}
        <div className="p-4">
          {isLoading ? (
            <Loader />
          ) : (
            filteredTask.map((task, i) => (
              <div className="flex items-center space-x-2" key={i}>
                <Checkbox
                  checked={task.status === PROJECT_STATUS_TYPE.COMPLETED}
                  onCheckedChange={() => handleCheckTask(task)}
                  disabled={isLoading}
                />
                <label
                  htmlFor="task"
                  className="text-sm font-medium leading-none"
                >
                  {task.content.title}
                </label>
              </div>
            ))
          )}
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
