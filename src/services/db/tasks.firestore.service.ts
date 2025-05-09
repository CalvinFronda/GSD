import FirestoreService from "./firestore.service";
import { COLLECTIONS } from "@/constants/firestore.constants";
import { Task } from "@/models";
import { where } from "firebase/firestore";

class TasksFirestoreService extends FirestoreService {
  constructor() {
    super(COLLECTIONS.TASKS, Task);
  }

  async getTasksByOwner(ownerId: string): Promise<Task[]> {
    return this.queryDocs<Task>([where("owner", "==", ownerId)]);
  }
}

export default TasksFirestoreService;
