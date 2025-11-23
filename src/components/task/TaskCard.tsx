
import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "../../types/TaskTypes";
import TextComponent from "../common/TextComponent";

import TrafficLightToggle from "../common/ToggleSwitch";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}) {
  const priorityColors: Record<string, string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5  transition ">
      {/* Top labels */}
      <div className="flex justify-between items-center gap-3 mb-3">
        <span
          className={`px-3 py-1 text-xs rounded-lg font-medium flex items-center gap-1 ${
            priorityColors[task.priority]
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current"></span>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>

        <TrafficLightToggle
          value={task.status}
          onChange={(status) => onStatusChange(task._id!, status)}
        />
      </div>

      {/* Title */}
      <div className="flex flex-col ">
        <TextComponent className="text-[18px]" text={task?.task} />
        <TextComponent className="text-[14px] mt-2" text={task?.description} />
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t-[0.5px] border-t-[#c8c7c7] ">
        <TextComponent
          className="text-[14px]"
          text={`Due Date: ${
            task?.dueDate && new Date(task.dueDate).toLocaleDateString("en-GB")
          }
`}
        />
        <div className="flex items-center gap-3">
          <button
            className="text-blue-600 cursor-pointer hover:text-blue-800 bg-blue-50 p-2 rounded-lg transition"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
          >
            <Pencil size={16} />
          </button>

          <button
            className="text-red-600 hover:text-red-800 cursor-pointer bg-red-50 p-2 rounded-lg transition"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task._id!);
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
