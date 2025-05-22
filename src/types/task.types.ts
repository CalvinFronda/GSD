type TaskStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";

type TaskDifficulty = 1 | 2 | 3 | 4;

type TaskWeight = 1 | 2 | 3 | 4;

type TaskInputDialog = {
  title: string;
  dueDate: string;
  description: string;
  weight?: number;
  difficulty?: number;
  media?: string[];
};

export type { TaskStatus, TaskDifficulty, TaskWeight, TaskInputDialog };
