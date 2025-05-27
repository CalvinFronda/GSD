type ProjectStatus =
  | "NOT_STARTED"
  | "PLANNING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ARCHIVED";

type ProjectInputDialog = {
  title: string;
  dueDate?: string;
  description?: string;
  labels: string[];
};

export type { ProjectStatus, ProjectInputDialog };
