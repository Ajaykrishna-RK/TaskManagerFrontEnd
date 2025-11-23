// src/pages/Tasks/TaskForm.tsx
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import type { Task } from "../../types/TaskTypes";

import InputField from "../common/InputField";
import ErrorText from "../common/ErrorText";
import ButtonLayout from "../common/ButtonLayout";
import StatusStepper from "../common/StatusStepper";
import TextComponent from "../common/TextComponent";
import type { RootState } from "../../redux/store";

interface Props {
  editing: Task | null;
  onCreate: (form: Partial<Task>) => Promise<void> | void;
  onUpdate: (form: Partial<Task>) => Promise<void> | void;
  clearEditing: () => void;
}

export default function TaskForm({
  editing,
  onCreate,
  onUpdate,
  clearEditing,
}: Props) {
  const userId = useSelector((state: RootState) => state.auth.user?._id);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Partial<Task>>({
    task: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const [errors, setErrors] = useState<{ task?: string }>({});

  // -------------------------------------------------------
  // Load form data when editing (memoized)
  // -------------------------------------------------------
  useEffect(() => {
    if (editing) {
      setForm({
        task: editing.task,
        description: editing.description,
        dueDate: editing.dueDate,
        priority: editing.priority,
      });
    }
  }, [editing]);

  // -------------------------------------------------------
  // Validation
  // -------------------------------------------------------
  const validate = useCallback(() => {
    const newErrors: { task?: string} = {};

    if (!form.task?.trim()) {
      newErrors.task = "Task is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  // -------------------------------------------------------
  // Handle Input Change (memoized)
  // -------------------------------------------------------
  const updateField = useCallback((key: keyof Task, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  // -------------------------------------------------------
  // Handle Submit
  // -------------------------------------------------------
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validate()) return;

      setLoading(true);

      try {
        const payload: Partial<Task> = {
          ...form,
          owner: userId,
        };

        if (editing) {
          await onUpdate(payload);
          clearEditing();
        } else {
          await onCreate(payload);
        }

        // Reset form after success
        setForm({
          task: "",
          description: "",
          dueDate: "",
          priority: "medium",
        });
        setErrors({});
      } catch (err) {
        console.error("Task Form Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [form, userId, editing, onCreate, onUpdate, validate, clearEditing]
  );

  // -------------------------------------------------------
  // JSX
  // -------------------------------------------------------
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full mb-6 items-start"
    >
      {/* Task Name */}
      <div className="flex flex-col w-full">
        <InputField
          placeholder="Task"
          value={form.task || ""}
          onChange={(e) => updateField("task", e.target.value)}
        />
        {errors.task && <ErrorText text={errors.task} />}

        {/* Description */}
        <InputField
          placeholder="Description"
          className="mt-2"
          value={form.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
        />

        {/* Due Date */}
        <InputField
          type="date"
          className="mt-2"
          value={form.dueDate || ""}
          onChange={(e) => updateField("dueDate", e.target.value)}
        />
      </div>

      {/* Priority Selector */}
      <div className="flex flex-col cursor-pointer">
        <TextComponent className="mb-2" text="Priority" />
        <StatusStepper
          steps={["low", "medium", "high"]}
          active={form.priority!}
          onChange={(newStatus) =>
            updateField("priority", newStatus as Task["priority"])
          }
        />
      </div>

      {/* Submit Button */}
      <ButtonLayout className="w-full" type="submit" variant="primary">
        {loading ? "Loading..." : editing ? "Update" : "Create"}
      </ButtonLayout>
    </form>
  );
}
