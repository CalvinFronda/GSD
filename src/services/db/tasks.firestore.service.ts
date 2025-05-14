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

  async createTask(values?: {
    content: { title: string; description?: string; media?: any[] };
    dueDate?: string;
    weight?: TaskWeight;

    difficulty?: TaskDifficulty;
  }) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error("User not authenticated");

    const now = new Date().toISOString();

    const task = new Task(
      user.uid,
      values?.dueDate || now,
      values?.difficulty || 2,
      values?.weight || 2,
      values?.content.media || [],
      values?.content.title || "Untitled Task",
      values?.content.description || "",
      [] // tags or other field if needed
    );

    return this.create(task.asObject()) as unknown as Task;
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
