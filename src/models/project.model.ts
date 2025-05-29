import type { ProjectStatus } from "@/types/index";

class Project {
  owner: string;
  status: ProjectStatus;
  dueDate: string | null;
  completedAt: string | null;
  labels: string[];
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  constructor(
    owner: string,
    dueDate: string,
    labels: string[],
    title: string,
    description: string,
  ) {
    this.owner = owner;
    this.status = "NOT_STARTED";
    this.dueDate = dueDate;
    this.completedAt = null;
    this.labels = labels;
    this.title = title;
    this.description = description;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.deletedAt = null;
  }

  asObject() {
    return { ...this };
  }
}

export default Project;
