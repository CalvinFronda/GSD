import { where } from "firebase/firestore";

import { COLLECTIONS, TASK_STATUS_TYPE } from "@/constants/firestore.constants";
import Project from "@/models/project.model";
import { ProjectInputDialog } from "@/types";

import FirestoreService from "./firestore.service";

class ProjectsFirestoreService extends FirestoreService {
  constructor() {
    super(COLLECTIONS.PROJECTS, Project);
  }

  async getProjectsByOwner(ownerId: string): Promise<Project[]> {
    return await this.queryDocs<Project>([
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
    );

    await this.create(project.asObject());
  }

  async updateProject(projectId: string, data: ProjectInputDialog) {
    if (!projectId) return;

    return await this.update(projectId, data);
  }

  async deleteProjectkById(projectId: string) {
    const now = new Date().toISOString();
    return await this.update(projectId, { deletedAt: now, updatedAt: now });
  }
}

export default ProjectsFirestoreService;
