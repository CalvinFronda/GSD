type TaskStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "WAITING"
  | "SOMEDAY"
  | "ARCHIVED"
  | "DAILY_TODO";

type TaskDifficulty = 1 | 2 | 3 | 4;

type TaskWeight = 1 | 2 | 3 | 4;

type TaskInputDialog = {
  title?: string;
  dueDate?: string | null;
  description?: string;
  weight?: number;
  difficulty?: number;
  media?: string[];
  projectId?: string | null;
  status?: string;
  completedAt?: string | null;
};

export type { TaskStatus, TaskDifficulty, TaskWeight, TaskInputDialog };
