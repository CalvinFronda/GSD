import { create } from "zustand";
import { Task } from "@/models";

import TasksFirestoreService from "@/services/db/tasks.firestore.service";
import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";

export interface TaskType extends Task {
  id?: string;
}

type TaskStoreTypes = {
  tasks: TaskType[];
  isTaskLoading: boolean;
  isTaskDialogOpen: boolean;
  selectedTask: TaskType | null;
  dialogMode: "create" | "edit";
  addTask: (tasks: TaskType) => void;
  setTasks: (tasks: TaskType[]) => void;
  deleteTask: (taskId: string) => void;
  archiveTask: (taskId: TaskType) => void;
  duplicateTask: (taskId: TaskType) => void;
  openTaskDialog: (task?: Task) => void;
  closeTaskDialog: () => void;
};

const now = new Date().toISOString();

export const useTaskStore = create<TaskStoreTypes>((set) => ({
  tasks: [],
  isTaskLoading: false,
  isTaskDialogOpen: false,
  selectedTask: null,
  dialogMode: "create",
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  setTasks: (tasks) => set({ tasks }),
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
