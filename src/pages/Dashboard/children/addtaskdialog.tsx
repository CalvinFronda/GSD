import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";
import { TaskDifficulty, TaskWeight } from "@/types/index";
import TasksFirestoreService from "@/services/db/tasks.firestore.service";
import FirebaseAuth from "@/services/firebase-auth.service";
import TaskForm from "./taskform";
import { taskSchema } from "./taskform";
import { useTaskStore } from "@/store/useTaskStore";

export function TaskDialog() {
  const taskFirestoreService = new TasksFirestoreService();
  const firebaseAuth = new FirebaseAuth();

  const { selectedTask, isTaskDialogOpen, openTaskDialog, closeTaskDialog } =
    useTaskStore();

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
        if (selectedTask.id) {
          await taskFirestoreService.update(selectedTask.id, updatedTask);
        }
      } else {
        const newTask = {
          ...values,
          difficulty: difficulty as TaskDifficulty,
          weight: weight as TaskWeight,
        };
        await taskFirestoreService.createTask(newTask);
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
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{selectedTask ? "Edit" : "Create new"} task</DialogTitle>
        </DialogHeader>
        <TaskForm onSubmit={onSubmit} initialData={selectedTask} />
      </DialogContent>
    </Dialog>
  );
}
