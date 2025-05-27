import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";

import FirebaseAuth from "@/services/firebase-auth.service";
import ProjectForm, { projectSchema } from "./ProjectForm";
import { useTaskStore } from "@/store/useTaskStore";
import ProjectsFirestoreService from "@/services/db/projects.firestore.service";

/**

 */
export function ProjectDialog() {
  const projectFirestoreService = new ProjectsFirestoreService();
  const firebaseAuth = new FirebaseAuth();

  const { selectedTask, isTaskDialogOpen, openTaskDialog, closeTaskDialog } =
    useTaskStore();

  const onSubmit = async (values: z.input<typeof projectSchema>) => {
    try {
      const validatedData = projectSchema.parse(values);
      console.log(validatedData);
      const user = firebaseAuth.me();

      if (!user) {
        throw new Error("User not authenticated");
      }

      await projectFirestoreService.createProject(user.uid, validatedData);

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
        <Button variant="outline"> New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedTask ? "Edit" : "Create new"} project
          </DialogTitle>
        </DialogHeader>
        <ProjectForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
