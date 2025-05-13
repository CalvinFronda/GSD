import FirestoreService from "./firestore.service";
import { COLLECTIONS, TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import { Task } from "@/models";
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
}

export default TasksFirestoreService;
