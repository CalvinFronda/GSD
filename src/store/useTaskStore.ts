import { create } from "zustand";
import { Task } from "@/models";

import TasksFirestoreService from "@/services/db/tasks.firestore.service";
import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";

export interface TaskType extends Task {
  id?: string;
}

interface TaskStoreTypes {
  tasks: TaskType[];
  selectedTask: TaskType | null;
  isTaskDialogOpen: boolean;
  dialogMode: "create" | "edit";
  fetchTasks: () => Promise<void>;
  // updateTask: (id: string, task: Partial<TaskType>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  archiveTask: (task: TaskType) => Promise<void>;
  duplicateTask: (task: TaskType) => Promise<TaskType | null>;
  openTaskDialog: (task?: Task) => void;
  closeTaskDialog: () => void;
}

const now = new Date().toISOString();

export const useTaskStore = create<TaskStoreTypes>((set, get) => ({
  tasks: [],
  isTaskDialogOpen: false,
  selectedTask: null,
  dialogMode: "create",
  fetchTasks: async () => {
    try {
      const service = new TasksFirestoreService();
      const data = await service.getTasksByOwner();
      set({ tasks: data as TaskType[] });
    } catch (error) {}
  },
  deleteTask: async (taskId) => {
    try {
      const service = new TasksFirestoreService();
      await service.deleteTaskById(taskId);

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  archiveTask: async (task) => {
    try {
      const service = new TasksFirestoreService();
      if (task.id) {
        const newTaskData = await service.update(task.id, {
          updatedAt: now,
          status: TASK_STATUS_TYPE.ARCHIVED,
        });
      }
    } catch (error) {}
  },
  duplicateTask: async (task) => {
    try {
      const service = new TasksFirestoreService();

      // Extract the properties we want to copy, excluding id and createdAt
      const { id, createdAt, ...rest } = task;

      // Create a new task object
      console.log("task in dup", task);
      const defaultNewTask = {
        ...rest,
        content: {
          ...rest.content,
          title: `${task.content.title} (copy)`,
        },
      };
      console.log("defaultNewTask", defaultNewTask);
      // Save the new task to the database
      const returnedTask = await service.createTask(defaultNewTask);

      if (returnedTask) {
        // Update the state with the new task
        set((state) => ({
          tasks: [...state.tasks, returnedTask],
        }));
        return returnedTask;
      }
      console.log("returnedTask", returnedTask);
      return null;
    } catch (error) {
      console.error("Error duplicating task:", error);
      return null;
    }
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
