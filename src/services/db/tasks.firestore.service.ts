import FirestoreService from "./firestore.service";
import { COLLECTIONS, TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import { Task } from "@/models";
import { TaskDifficulty, TaskWeight } from "@/types";
import { getAuth } from "firebase/auth";
import { where } from "firebase/firestore";

class TasksFirestoreService extends FirestoreService {
  constructor() {
    super(COLLECTIONS.TASKS, Task);
  }

  async createTask({
    title,
    dueDate,
    weight,
    description,
    difficulty,
  }: {
    title: string;
    dueDate: string;
    weight: TaskWeight;
    description: string;
    difficulty: TaskDifficulty;
  }) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error("User not authenticated");

    const now = new Date().toISOString();

    const task = new Task(
      user.uid,
      dueDate || now,
      difficulty || 1,
      weight || 1,
      [], // labels
      title || "Untitled Task",
      description || "",
      [] // media
    );

    await this.create(task.asObject());
  }

  async getTasksByOwner(): Promise<Task[]> {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) throw new Error("User not authenticated");

    const ownerId = currentUser.uid;
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
}

export default TasksFirestoreService;
