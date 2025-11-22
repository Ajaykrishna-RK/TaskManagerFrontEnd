// src/components/task/TaskList.tsx
import type { Task } from "../../types/TaskTypes";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export default function TaskList({ tasks, onDelete, onEdit, onStatusChange }: Props) {
  return (
    <div className="grid gap-4">
      {tasks.length > 0 ? (
        tasks.map((t) => (
          <TaskCard
            key={t._id}
            task={t}
            onDelete={onDelete}
            onEdit={onEdit}
            onStatusChange={onStatusChange}
          />
        ))
      ) : (
        <div className="text-gray-500 text-xl">No tasks yet.</div>
      )}
    </div>
  );
}
