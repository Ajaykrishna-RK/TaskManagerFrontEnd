// src/pages/Tasks/TaskForm.tsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { Task } from "../../types/TaskTypes";
import InputField from "../common/InputField";
import ErrorText from "../common/ErrorText";

import type { RootState } from "../../redux/store";
import ButtonLayout from "../common/ButtonLayout";
import StatusStepper from "../common/StatusStepper";
import TextComponent from "../common/TextComponent";

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
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const [errors, setErrors] = useState<{ task?: string; dueDate?: string }>({}); // task validation

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const validate = () => {
    const newErrors: { task?: string; dueDate?: string } = {};

    if (!form.task || form.task.trim() === "") {
      newErrors.task = "task is required";
    }
    if (!form.dueDate || form.dueDate.trim() === "") {
      newErrors.dueDate = "Date is required";
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
      className="flex gap-3 flex-col  w-full mb-6 items-start"
    >
      {/* task */}
      <div className="flex flex-col flex-1 w-full">
        <InputField
          placeholder="task"
          value={form.task || ""}
          onChange={(e) => setForm({ ...form, task: e.target.value })}
        />
        {errors.task && <ErrorText text={errors.task} />}

        <InputField
          placeholder="Description"
          className="mt-2"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <InputField
          type="date"
          value={form.dueDate || ""}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="mt-2"
        />

        {errors.dueDate && <ErrorText text={errors.dueDate} />}
      </div>

      {/* Priority */}
      <div className="flex flex-col cursor-pointer">
        <TextComponent className="mb-2" text="Priority" />
        <StatusStepper
          steps={["low", "medium", "high"]}
          active={form.priority!}
          onChange={(newStatus) =>
            setForm({
              ...form,
              priority: newStatus as Task["priority"],
            })
          }
        />
      </div>

      {/* Save Button */}
      <ButtonLayout className="w-full " type="submit" variant="primary">
        {editing ? "Update" : "Create"}
      </ButtonLayout>
    </form>
  );
}
