import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TaskType } from "@/store/useTaskStore";
import ProcessForm from "./processForm";
import { useState } from "react";

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
        </DialogHeader>
        <ProcessForm initialData={task} />
      </DialogContent>
    </Dialog>
  );
}
