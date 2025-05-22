import FirestoreService from "./firestore.service";
import { COLLECTIONS, TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import { Task } from "@/models";
import { TaskDifficulty, TaskWeight, TaskInputDialog } from "@/types";
import { where } from "firebase/firestore";

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
    const updatedTask = {
      content: {
        title: data.title,
        description: data.description,
        media: data?.media || [],
      },
      dueDate: data.dueDate,
      difficulty: data.difficulty,
      weight: data.weight,
      updatedAt: new Date().toISOString(),
    };

    return this.update(taskId, updatedTask);
  }

  async createTask(userId: string, data: TaskInputDialog) {
    const task = new Task(
      userId,
      data.dueDate,
      data.difficulty as TaskDifficulty,
      data.weight as TaskWeight,
      [],
      data.title,
      data.description,
      [],
    );
    return this.create(task.asObject());
  }
}

export default TasksFirestoreService;
