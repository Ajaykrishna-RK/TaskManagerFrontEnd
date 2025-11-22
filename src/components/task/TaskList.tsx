import React from "react";
import type { Task } from "../../types/TaskTypes";
import TaskRow from "./TaskCard";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export default function TaskList({
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
}: Props) {
  if (!tasks.length) {
    return (
      <p className="text-gray-500 mt-6 text-center text-lg">
        No tasks available
      </p>
    );
  }

  return (
    <div className="mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-3">
      {tasks.map((task) => (
        <TaskRow
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
