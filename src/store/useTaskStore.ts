import { create } from "zustand";
import { Task } from "@/models";

import TasksFirestoreService from "@/services/db/tasks.firestore.service";
import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";

export interface TaskType extends Task {
  id?: string;
}

type TaskStoreTypes = {
  tasks: TaskType[];
  isTaskDialogOpen: boolean;
  selectedTask: TaskType | null;
  dialogMode: "create" | "edit";
  fetchTasks: (userId: string) => void;
  deleteTask: (taskId: string) => void;
  archiveTask: (taskId: TaskType) => void;
  duplicateTask: (taskId: TaskType) => void;
  openTaskDialog: (task?: Task) => void;
  closeTaskDialog: () => void;
};

const now = new Date().toISOString();

export const useTaskStore = create<TaskStoreTypes>((set) => ({
  tasks: [],
  isTaskDialogOpen: false,
  selectedTask: null,
  dialogMode: "create",
  fetchTasks: async (userId) => {
    const service = new TasksFirestoreService();
    const data = await service.getTasksByOwner(userId);
    set({ tasks: data });
  },
  deleteTask: async (taskId) => {
    const service = new TasksFirestoreService();
    return await service.deleteTaskById(taskId);
  },
  archiveTask: async (task) => {
    const service = new TasksFirestoreService();
    if (task.id) {
      return await service.update(task.id, {
        updatedAt: now,
        status: TASK_STATUS_TYPE.ARCHIVED,
      });
    }
  },
  duplicateTask: async (task) => {
    const service = new TasksFirestoreService();

    const { id, createdAt, ...rest } = task;
    const newTask = {
      ...rest,
      content: {
        title: task.content.title + " (copy)",
      },
      createdAt: now,
    };

    await service.create(newTask);
  },
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
