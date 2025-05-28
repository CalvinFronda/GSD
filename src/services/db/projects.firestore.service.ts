import { Task } from "@/models";
import FirestoreService from "./firestore.service";
import { COLLECTIONS, TASK_STATUS_TYPE } from "@/constants/firestore.constants";

import Project from "@/models/project.model";
import { ProjectInputDialog } from "@/types";
import { where } from "firebase/firestore";

class ProjectsFirestoreService extends FirestoreService {
  constructor() {
    super(COLLECTIONS.PROJECTS, Project);
  }

  async getProjectsByOwner(ownerId: string): Promise<Project[]> {
    return this.queryDocs<Project>([
      where("owner", "==", ownerId),
      where("deletedAt", "==", null),
      where("status", "in", [
        TASK_STATUS_TYPE.COMPLETED,
        TASK_STATUS_TYPE.IN_PROGRESS,
        TASK_STATUS_TYPE.NOT_STARTED,
      ]),
    ]);
  }

  async createProject(userId: string, data: ProjectInputDialog) {
    if (!userId) return;

    const project = new Project(
      userId,
      data.dueDate || "",
      data.labels,
      data.title,
      data.description || "",
      [],
    );

    await this.create(project.asObject());
  }

  async addTaskToProject(projectId: string, task: Task) {
    try {
      const projectDoc = (await this.get(projectId)) as Project;

      if (!projectId) {
        throw new Error(`Project with ID ${projectId} not found`);
      }

      await this.update(projectId, {
        tasks: [...(projectDoc.tasks || []), task],
        updatedAt: new Date().toISOString(),
      });

      return true;
    } catch (error) {
      console.error("Error adding task to project");
      throw error;
    }
  }
}

export default ProjectsFirestoreService;
