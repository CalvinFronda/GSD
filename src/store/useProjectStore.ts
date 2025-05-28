import { create } from "zustand";
import { Project, Task } from "@/models";

import TasksFirestoreService from "@/services/db/tasks.firestore.service";
import { TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import ProjectsFirestoreService from "@/services/db/projects.firestore.service";
import { TaskType } from "./useTaskStore";

export interface ProjectType extends Project {
  id?: string;
}

type ProjectStoreTypes = {
  projects: ProjectType[];
  isTaskLoading: boolean;
  isTaskDialogOpen: boolean;
  selectedProject: ProjectType | null;
  dialogMode: "create" | "edit";
  addProject: (projects: ProjectType) => void;
  setProject: (projects: ProjectType[]) => void;
  deleteProject: (taskId: string) => void;
  archiveProject: (taskId: ProjectType) => void;
  duplicateProject: (taskId: ProjectType) => void;
  addTaskToProject: (projetId: string, task: Task) => void;
  openTaskDialog: (task?: Project) => void;
  closeTaskDialog: () => void;
};

const now = new Date().toISOString();

export const useProjectStore = create<ProjectStoreTypes>((set) => ({
  projects: [],
  isTaskLoading: false,
  isTaskDialogOpen: false,
  selectedProject: null,
  dialogMode: "create",
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
  setProject: (projects) => set({ projects }),
  deleteProject: async (taskId) => {
    const service = new TasksFirestoreService();
    return await service.deleteTaskById(taskId);
  },
  archiveProject: async (project) => {
    const service = new TasksFirestoreService();
    if (project.id) {
      return await service.update(project.id, {
        updatedAt: now,
        status: TASK_STATUS_TYPE.ARCHIVED,
      });
    }
  },
  duplicateProject: async (project) => {
    const service = new TasksFirestoreService();

    const { id, createdAt, ...rest } = project;

    await service.create(rest);
  },
  addTaskToProject: async (projectId, task) => {
    const service = new ProjectsFirestoreService();

    return await service.addTaskToProject(projectId, task);
  },
  openTaskDialog: (project) =>
    set({
      isTaskDialogOpen: true,
      selectedProject: project ?? null,
      dialogMode: project ? "edit" : "create",
    }),
  closeTaskDialog: () =>
    set({
      isTaskDialogOpen: false,
      selectedProject: null,
    }),
}));
