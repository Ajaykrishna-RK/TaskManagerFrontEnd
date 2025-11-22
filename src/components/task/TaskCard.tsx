import { useState } from "react";
import type { Task } from "../../types/TaskTypes";
import TaskEditForm from "./TaskEditForm";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export default function TaskCard({
  task,
  onDelete,
  onEdit,
  onStatusChange,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-4 bg-white rounded shadow flex justify-between items-start">
      {/* LEFT SIDE */}
      {isEditing ? (
        <TaskEditForm
          task={task}
          onSave={(u) => {
            onEdit(u);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>

          <div className="flex gap-2 mt-3 text-xs">
            <span className="px-2 py-1 bg-gray-100 rounded">
              Priority: {task.priority}
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded">
              Status: {task.status}
            </span>
          </div>
        </div>
      )}

      {/* RIGHT BUTTONS */}
      <div className="flex flex-col gap-2 items-end">
        {!isEditing ? (
          <>
            <button
              className="text-blue-600 text-sm hover:underline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="text-red-600 text-sm hover:underline"
              onClick={() => onDelete(task._id!)}
            >
              Delete
            </button>
          </>
        ) : null}

        {/* Always visible: Status dropdown */}
        <select
          className="text-sm border rounded p-1"
          value={task.status}
          onChange={(e) =>
            onStatusChange(task._id!, e.target.value as Task["status"])
          }
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}
