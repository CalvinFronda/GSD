import FirestoreService from "./firestore.service";
import { COLLECTIONS } from "@/constants/firestore.constants";
import { Task } from "@/models";

class TasksFirestoreService extends FirestoreService {
  constructor() {
    super(COLLECTIONS.TASKS, Task);
  }
}

export default TasksFirestoreService;
