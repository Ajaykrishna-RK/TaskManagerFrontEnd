import React, { useState } from "react";
import type { Task } from "../../types/TaskTypes";
import InputField from "../common/InputField";
import ButtonLayout from "../common/ButtonLayout";

interface Props {
  task: Task;
  onSave: (updated: Task) => void;
  onCancel: () => void;
}

export default function TaskEditForm({ task, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Task>>(task);

  const handleSave = () => {
    if (!form.task?.trim()) return;
    onSave({ ...task, ...form });
  };

  return (
    <div className="flex-1">
      <InputField
        placeholder="task"
        value={form.task}
        onChange={(e) => setForm({ ...form, task: e.target.value })}
      />

    

      <InputField
        type="select"
        className="mt-2"
        value={form.priority}
        onChange={(e) =>
          setForm({
            ...form,
            priority: e.target.value as Task["priority"],
          })
        }
        options={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ]}
      />

      <InputField
        type="select"
        className="mt-2"
        value={form.status}
        onChange={(e) =>
          setForm({
            ...form,
            status: e.target.value as Task["status"],
          })
        }
        options={[
          { value: "todo", label: "Todo" },
          { value: "in-progress", label: "In Progress" },
          { value: "done", label: "Done" },
        ]}
      />

      <div className="flex gap-2 mt-3">
        <ButtonLayout variant="primary" onClick={handleSave}>
          Save
        </ButtonLayout>

        <ButtonLayout variant="secondary" onClick={onCancel}>
          Cancel
        </ButtonLayout>
      </div>
    </div>
  );
}
