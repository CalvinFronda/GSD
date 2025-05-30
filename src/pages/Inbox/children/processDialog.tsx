import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TaskType } from "@/store/useTaskStore";

import ProcessForm from "./processForm";

/**
    Dialog component used to display the edit task form
 */
export function ProcessDialog({ task }: { task: TaskType }) {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={() => openDialog()}>
      <DialogTrigger asChild>
        <Button variant="outline">Process</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Process Item</DialogTitle>
          <DialogDescription>
            Tidy up your task by setting details or assigning it to a project. A
            clear inbox helps you focus on what really matters.
          </DialogDescription>
        </DialogHeader>
        <ProcessForm initialData={task} handleOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
