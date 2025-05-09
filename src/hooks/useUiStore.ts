import { create } from "zustand";
import { Task } from "@/models";

interface TaskType extends Task {
  id?: string;
}

type UIStore = {
  isTaskDialogOpen: boolean;
  selectedTask: TaskType | null;
  dialogMode: "create" | "edit";
  openTaskDialog: (task?: Task) => void;
  closeTaskDialog: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  isTaskDialogOpen: false,
  selectedTask: null,
  dialogMode: "create",
  openTaskDialog: (task) =>
    set({
      isTaskDialogOpen: true,
      selectedTask: task ?? null,
      dialogMode: task ? "edit" : "create",
    }),
  closeTaskDialog: () =>
    set({
      isTaskDialogOpen: false,
      selectedTask: null,
    }),
}));
