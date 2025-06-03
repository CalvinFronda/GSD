import type { TaskDifficulty, TaskStatus, TaskWeight } from "@/types/index";

class Task {
  owner: string;
  status: TaskStatus;
  dueDate: string | null;
  completedAt: string | null;
  difficulty: TaskDifficulty;
  weight: TaskWeight;
  labels: string[];
  content: {
    title: string;
    description: string;
    media: string[];
  };
  projectId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  constructor(
    owner: string,
    status: TaskStatus = "NOT_STARTED",
    dueDate: string | null,
    difficulty: TaskDifficulty,
    weight: TaskWeight,
    labels: string[],
    title: string,
    description: string,
    media: string[] = [],
    projectId: string | null = null,
  ) {
    this.owner = owner;
    this.status = status;
    this.dueDate = dueDate;
    this.completedAt = null;
    this.difficulty = difficulty;
    this.weight = weight;
    this.labels = labels;
    this.content = {
      title,
      description,
      media,
    };
    this.projectId = projectId;
    const now = new Date().toISOString();
    this.createdAt = now;
    this.updatedAt = now;
    this.deletedAt = null;
  }

  asObject() {
    return { ...this };
  }
}

export default Task;
