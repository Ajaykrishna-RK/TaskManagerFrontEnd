export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "done";

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
  status: Status;
  aiSuggestedPriority?: Priority | string;
  createdAt?: string;
  updatedAt?: string;
}