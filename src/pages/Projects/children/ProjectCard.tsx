import { X } from "lucide-react";
import { z } from "zod";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

import { useAuth } from "@/features/auth/authContext";

import TasksFirestoreService from "@/services/db/tasks.firestore.service";

import { ProjectType } from "@/store/useProjectStore";
import { TaskType, useTaskStore } from "@/store/useTaskStore";

import {
  PROJECT_STATUS_TYPE,
  TASK_STATUS_TYPE,
} from "@/constants/firestore.constants";
import { useFetchTasks } from "@/hooks/useFetchTasks";

import ProjectCardHeader from "./ProjectCardHeader";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
});

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const [progress, setProgress] = useState(0);
  const [addTaskBtn, setAddTaskBtn] = useState(false);
  const [taskInput, setTaskInput] = useState("");

  const { user } = useAuth();
  const { id } = project;
  const { tasks } = useTaskStore((s) => s);
  const filteredTask = tasks.filter((task) => task.projectId === project.id);

  useFetchTasks();

  const service = new TasksFirestoreService();

  const handleCreateTask = async () => {
    const parsed = taskSchema.safeParse({ title: taskInput });

    if (!parsed.success) {
      console.error(parsed.error.errors[0].message);
      return;
    }

    try {
      if (!user?.uid) return;
      await service.createTask(user?.uid, {
        title: parsed.data.title,
        projectId: id,
        status: PROJECT_STATUS_TYPE.IN_PROGRESS,
      });

      setTaskInput("");
      setAddTaskBtn(false);
    } catch (error) {
      console.error("Failed to create task");
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
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  // Handle progress bar
  const completedTasks = filteredTask.filter(
    (task) => task.status === PROJECT_STATUS_TYPE.COMPLETED,
  ).length;

  const totalTasks = filteredTask.length;
  const percComplete = Math.round(completedTasks / totalTasks) * 100 || 0;

  useEffect(() => {
    setProgress(percComplete);
  }, [filteredTask]);

  return (
    <>
      <Card className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <ProjectCardHeader project={project} />

        <CardContent>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-600">
                Progress: {progress} %
              </div>
              <div className="text-sm text-gray-600">
                {
                  filteredTask.filter((task) => task.status === "COMPLETED")
                    .length
                }
                /{totalTasks} tasks
              </div>
            </div>
            <Progress value={progress} />
          </div>

          <div className="flex flex-col gap-1 p-4">
            {filteredTask.map((task, i) => (
              <div className="flex items-center space-x-2" key={i}>
                <Checkbox
                  checked={task.status === PROJECT_STATUS_TYPE.COMPLETED}
                  onCheckedChange={() => handleCheckTask(task)}
                />
                <label className="text-sm font-medium leading-none">
                  {task.content.title}
                </label>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="flex w-full gap-2 items-center">
            {addTaskBtn ? (
              <>
                <Input
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder="Enter task title"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateTask();
                  }}
                />
                <Button size="icon" onClick={handleCreateTask}>
                  +
                </Button>
                <X
                  className="cursor-pointer"
                  color="red"
                  onClick={() => setAddTaskBtn(false)}
                />
              </>
            ) : (
              <Button variant="ghost" onClick={() => setAddTaskBtn(true)}>
                + Add task
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProjectCard;
