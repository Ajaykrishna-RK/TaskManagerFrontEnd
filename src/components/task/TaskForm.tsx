// src/pages/Tasks/TaskForm.tsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { Task } from "../../types/TaskTypes";
import InputField from "../common/InputField";
import ErrorText from "../common/ErrorText";

import type { RootState } from "../../redux/store";
import ButtonLayout from "../common/ButtonLayout";

interface Props {
  editing: Task | null;
  onCreate: (form: Partial<Task>) => void;
  onUpdate: (form: Partial<Task>) => void;
  clearEditing: () => void;
}

export default function TaskForm({
  editing,
  onCreate,
  onUpdate,
  clearEditing,
}: Props) {
  const userId = useSelector((state: RootState) => state.auth.user?._id);

  const [form, setForm] = useState<Partial<Task>>({
    task: "",

    priority: "medium",
  });

  const [errors, setErrors] = useState<{ task?: string }>({}); // task validation

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const validate = () => {
    const newErrors: { task?: string } = {};

    if (!form.task || form.task.trim() === "") {
      newErrors.task = "task is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      ...form,
      owner: userId,
    };

    if (editing) onUpdate(payload);
    else onCreate(payload);

    setForm({ task: "", priority: "medium" });
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 flex-wrap mb-6 items-start"
    >
      {/* task */}
      <div className="flex flex-col flex-1 min-w-[180px]">
        <InputField
          placeholder="task"
          value={form.task || ""}
          onChange={(e) => setForm({ ...form, task: e.target.value })}
        />
        {errors.task && <ErrorText text={errors.task} />}
      </div>

      {/* Description */}

      {/* Priority */}
      <div className="flex flex-col cursor-pointer">
        <InputField
          type="select"
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
      </div>

      {/* Save Button */}
      <ButtonLayout type="submit" variant="primary">
        {editing ? "Update" : "Create"}
      </ButtonLayout>

      {/* Cancel Button */}
      {editing && (
        <ButtonLayout
          type="button"
          variant="secondary"
          onClick={() => {
            clearEditing();
            setForm({ task: "", priority: "medium" });
            setErrors({});
          }}
        >
          Cancel
        </ButtonLayout>
      )}
    </form>
  );
}
