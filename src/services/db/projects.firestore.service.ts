import FirestoreService from "./firestore.service";
import { COLLECTIONS } from "@/constants/firestore.constants";

import Project from "@/models/project.model";

class ProjectsFirestoreService extends FirestoreService {
  constructor() {
    super(COLLECTIONS.PROJECTS, Project);
  }

  async createProject(userId: string, data) {
    if (!userId) return;
    const project = new Project(userId);
  }
}

export default ProjectsFirestoreService;
