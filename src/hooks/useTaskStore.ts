import { create } from "zustand";
import { Task } from "@/models";

import TasksFirestoreService from "@/services/db/tasks.firestore.service";
import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";

export interface TaskType extends Task {
  id?: string;
}

type TaskStore = {
  tasks: TaskType[];
  fetchTasks: (userId: string) => void;
  deleteTask: (taskId: string) => void;
  archiveTask: (taskId: string) => void;
  isTaskDialogOpen: boolean;
  selectedTask: TaskType | null;
  dialogMode: "create" | "edit";
  openTaskDialog: (task?: Task) => void;
  closeTaskDialog: () => void;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  fetchTasks: async (userId) => {
    const service = new TasksFirestoreService();
    const data = await service.getTasksByOwner(userId);
    set({ tasks: data });
  },
  deleteTask: async (taskId) => {
    const service = new TasksFirestoreService();
    return await service.deleteTaskById(taskId);
  },
  archiveTask: async (taskId) => {
    const service = new TasksFirestoreService();
    const now = new Date().toISOString();
    return await service.update(taskId, {
      updatedAt: now,
      status: TASK_STATUS_TYPE.ARCHIVED,
    });
  },
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
