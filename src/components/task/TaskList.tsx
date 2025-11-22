import React from "react";
import type { Task } from "../../types/TaskTypes";
import { Pencil, Trash2, MoreVertical } from "lucide-react";

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
  if (tasks.length === 0) {
    return <div className="text-gray-500 mt-4">No tasks available</div>;
  }

  const statusColor = {
    todo: "text-gray-600 bg-gray-100",
    "in-progress": "text-blue-700 bg-blue-100",
    done: "text-green-700 bg-green-100",
  };

  return (
    <div className="mt-6 bg-white shadow-sm border border-gray-200 rounded-lg">
      {/* HEADER ROW */}
      <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b bg-gray-50 text-sm font-medium text-gray-600">
        <div className="col-span-2">Task</div>
        <div>Status</div>
        <div>Due Date</div>
        <div>AI Priority</div>
        <div className="text-right">Actions</div>
      </div>

      {/* TASK ROWS */}
      {tasks.map((task) => (
        <div
          key={task._id}
          className="grid grid-cols-6 gap-4 px-6 py-4 border-b last:border-none hover:bg-gray-50 transition cursor-pointer"
        >
          {/* Title */}
          <div className="col-span-2 flex items-center gap-3">
            <div>
              <p className="font-medium text-gray-900">{task.task}</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <select
              className={`px-2 py-1 rounded text-xs border ${
                statusColor[task.status]
              }`}
              value={task.status}
              onChange={(e) =>
                onStatusChange(task._id!, e.target.value as Task["status"])
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="text-sm text-gray-700">
            {task.dueDate ? new Date(task.dueDate).toDateString() : "—"}
          </div>

          {/* AI Priority */}
          <div>
            <span className="px-2 py-1 bg-purple-50 border border-purple-200 text-purple-700 text-xs rounded">
              {task.aiSuggestedPriority || "—"}
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end items-center gap-3">
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => onEdit(task)}
            >
              <Pencil size={18} />
            </button>

            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => onDelete(task._id!)}
            >
              <Trash2 size={18} />
            </button>

      
          </div>
        </div>
      ))}


      
    </div>
  );
}
