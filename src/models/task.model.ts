import type { TaskStatus, TaskDifficulty, TaskWeight } from "@/types/index";

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
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  constructor(
    owner: string,
    dueDate: string,
    difficulty: TaskDifficulty,
    weight: TaskWeight,
    labels: string[],
    title: string,
    description: string,
    media?: string[],
  ) {
    this.owner = owner;
    this.status = "NOT_STARTED";
    this.dueDate = dueDate;
    this.completedAt = null;
    this.difficulty = difficulty;
    this.weight = weight;
    this.labels = labels;
    this.content = {
      title: title,
      description: description,
      media: media || [],
    };
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.deletedAt = null;
  }

  asObject() {
    return { ...this };
  }
}

export default Task;
