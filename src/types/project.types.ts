type ProjectStatus =
  | "NOT_STARTED"
  | "PLANNING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ARCHIVED";

type ProjectInputDialog = {
  title: string;
  dueDate?: string | undefined | null;
  description?: string;
  labels: string[];
  updatedAt: string | undefined | null;
};

export type { ProjectStatus, ProjectInputDialog };
