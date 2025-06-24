import { where } from "firebase/firestore";

import { COLLECTIONS, TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import { Task } from "@/models";
import {
  TaskDifficulty,
  TaskInputDialog,
  TaskStatus,
  TaskWeight,
} from "@/types";

import FirestoreService from "./firestore.service";

class TasksFirestoreService extends FirestoreService {
  constructor() {
    super(COLLECTIONS.TASKS, Task);
  }

  async getTasksByOwner(ownerId: string): Promise<Task[]> {
    return this.queryDocs<Task>([
      where("owner", "==", ownerId),
      where("deletedAt", "==", null),
      where("status", "in", [
        TASK_STATUS_TYPE.COMPLETED,
        TASK_STATUS_TYPE.IN_PROGRESS,
        TASK_STATUS_TYPE.NOT_STARTED,
      ]),
    ]);
  }

  async deleteTaskById(taskId: string) {
    const now = new Date().toISOString();
    return this.update(taskId, { deletedAt: now, updatedAt: now });
  }

  async updateTask(taskId: string, data: TaskInputDialog) {
    if (!taskId) return;

    const updatedTask = {
      content: {
        title: data.title,
        description: data.description,
        media: data?.media || [],
      },
      dueDate: data.dueDate,
      difficulty: data.difficulty,
      weight: data.weight,
      status: data?.status,
      completedAt: data?.completedAt,
      updatedAt: new Date().toISOString(),
    };

    return await this.update(taskId, updatedTask);
  }

  async createTask(userId: string, data: TaskInputDialog) {
    if (!userId) return;
    const task = new Task(
      userId,
      (data.status as TaskStatus) || TASK_STATUS_TYPE.NOT_STARTED,
      data.dueDate || "",
      (data.difficulty as TaskDifficulty) || null,
      (data.weight as TaskWeight) || null,
      [],
      data.title,
      data.description || "",
      [],
      data.projectId || "",
    );
    this.create(task.asObject());
    return task.asObject();
  }
}

export default TasksFirestoreService;
