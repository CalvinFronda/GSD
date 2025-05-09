import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";
import { Task } from "@/models";
import { TaskDifficulty, TaskWeight } from "@/types";
import TasksFirestoreService from "@/services/db/tasks.firestore.service";
import FirebaseAuth from "@/services/firebase-auth.service";
import TaskForm from "./taskform";
import { taskSchema } from "./taskform";
import { useUIStore } from "@/hooks/useUiStore";

export function TaskDialog() {
  const taskFirestoreService = new TasksFirestoreService();
  const firebaseAuth = new FirebaseAuth();

  const { selectedTask, isTaskDialogOpen, openTaskDialog, closeTaskDialog } =
    useUIStore();
  console.log("selectedTask", selectedTask);
  const onSubmit = async (values: z.input<typeof taskSchema>) => {
    const { title, dueDate, weight, description, difficulty } =
      taskSchema.parse(values);

    try {
      const me = firebaseAuth.me();
      if (!me) return;
      if (selectedTask) {
        const updatedTask = {
          content: {
            title,
            description,
            media: selectedTask.content.media || [], // preserve existing media
          },
          dueDate,
          difficulty: difficulty as TaskDifficulty,
          weight: weight as TaskWeight,
          updatedAt: new Date().toISOString(),
        };

        await taskFirestoreService.update(selectedTask.id, updatedTask);
      } else {
        const task = new Task(
          me.uid,
          dueDate,
          difficulty as TaskDifficulty,
          weight as TaskWeight,
          [],
          title,
          description,
          []
        );
        await taskFirestoreService.create(task.asObject());
      }

      closeTaskDialog();
    } catch (error: any) {
      console.error("Error adding task: ", error);
    }
  };

  return (
    <Dialog
      open={isTaskDialogOpen}
      onOpenChange={(open) => (open ? openTaskDialog() : closeTaskDialog())}
    >
      <DialogTrigger asChild>
        <Button variant="outline">New Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{selectedTask ? "Edit" : "Create new"} task</DialogTitle>
        </DialogHeader>
        <TaskForm onSubmit={onSubmit} initialData={selectedTask} />
      </DialogContent>
    </Dialog>
  );
}
