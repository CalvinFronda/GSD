import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";

import TasksFirestoreService from "@/services/db/tasks.firestore.service";
import FirebaseAuth from "@/services/firebase-auth.service";
import TaskForm from "./taskform";
import { taskSchema } from "./taskform";
import { useTaskStore } from "@/store/useTaskStore";

/**
 * TaskDialog Component
 *
 * A dialog component that handles both creation and editing of tasks
 * It uses Firebase for data persistence and Zod for form validation.
 *
 * Features:
 * - Creates new tasks with title, description, due date, difficulty, and weight
 * - Edits existing tasks while preserving media attachments
 * - Validates input using Zod schema
 * - Integrates with Firebase authentication and Firestore
 * - Manages dialog state through useTaskStore
 *
 * @component
 * @param {string} [props.btnTitle] - Optional custom title for the trigger button
 *
 * @example
 * // Basic usage
 * <TaskDialog />
 *
 * // With custom button title
 * <TaskDialog btnTitle="Add New Task" />
 *
 * State Management:
 * - Uses useTaskStore for managing dialog open/close state
 * - Handles selected task state for edit mode
 *
 * Form Handling:
 * - Validates input using taskSchema (Zod)
 * - Preserves existing media when updating
 * - Converts form values to proper task model structure
 *

 */
export function TaskDialog({ btnTitle }: { btnTitle?: string }) {
  const taskFirestoreService = new TasksFirestoreService();
  const firebaseAuth = new FirebaseAuth();

  const { selectedTask, isTaskDialogOpen, openTaskDialog, closeTaskDialog } =
    useTaskStore();

  const onSubmit = async (values: z.input<typeof taskSchema>) => {
    try {
      const validatedData = taskSchema.parse(values);
      const user = firebaseAuth.me();

      if (!user) {
        throw new Error("User not authenticated");
      }

      if (selectedTask?.id) {
        await taskFirestoreService.updateTask(selectedTask.id, validatedData);
      } else {
        await taskFirestoreService.createTask(user.uid, validatedData);
      }

      closeTaskDialog();
    } catch (error) {
      console.error("Error handling task submission:", error);
      // Consider adding proper error handling/user feedback here
    }
  };

  return (
    <Dialog
      open={isTaskDialogOpen}
      onOpenChange={(open) => (open ? openTaskDialog() : closeTaskDialog())}
    >
      <DialogTrigger asChild>
        <Button variant="outline">{btnTitle || "New Task"}</Button>
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
