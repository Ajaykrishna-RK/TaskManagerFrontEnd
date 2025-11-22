import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "../../types/TaskTypes";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export default function TaskCard({ task, onDelete, onEdit, onStatusChange }: Props) {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all">
      {/* TOP ROW */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{task.task}</h3>
        
        </div>

        <div className="flex gap-3">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => onEdit(task)}
            title="Edit Task"
          >
            <Pencil size={18} />
          </button>

          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => onDelete(task._id!)}
            title="Delete Task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* TAGS */}
      <div className="flex gap-3 mt-4 text-xs">
        <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded">
          Priority: {task.priority}
        </span>

        <span className="px-2 py-1 bg-yellow-50 text-yellow-800 border border-yellow-100 rounded">
          AI: {task.aiSuggestedPriority || "—"}
        </span>

        <span className="px-2 py-1 bg-purple-50 text-purple-800 border border-purple-100 rounded">
          Status: {task.status}
        </span>
      </div>

      {/* STATUS SELECT */}
      <div className="mt-4">
        <select
          className="border p-2 rounded text-sm bg-gray-50"
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
    </div>
  );
}
