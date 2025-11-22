// src/pages/Tasks/TaskPage.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
  setLoading,
  addTask,
  updateTask,
  removeTask,
} from "../../redux/slice/TaskSlice";

import type { RootState } from "../../redux/store";
import type { Task } from "../../types/TaskTypes";
import { taskService } from "../../services/taskService/TaskService";
import TaskForm from "../../components/task/TaskForm";
import TaskList from "../../components/task/TaskList";
import PopUpWrapper from "../../components/common/PopUpWrapper";
import ButtonLayout from "../../components/common/ButtonLayout";

export default function TaskPage() {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((s: RootState) => s.tasks);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  useEffect(() => {
    const load = async () => {
      dispatch(setLoading(true));
      try {
        const data = await taskService.fetchTasks();
        dispatch(setTasks(data));
      } finally {
        dispatch(setLoading(false));
      }
    };
    load();
  }, [dispatch]);

  const handleCreate = async (form: Partial<Task>) => {
    const created = await taskService.createTask(form);
    dispatch(addTask(created));
    setModalOpen(false);
  };

  const handleUpdate = async (form: Partial<Task>) => {
    if (!editing) return;

    const updated = await taskService.updateTask(editing._id!, form);
    dispatch(updateTask(updated));
    setEditing(null);
    setModalOpen(false);
  };

  const handleStatusChange = async (id: string, status: Task["status"]) => {
    const updated = await taskService.updateTask(id, { status });
    dispatch(updateTask(updated));
  };
  const confirmDelete = async () => {
    if (!deleteId) return;

    await taskService.deleteTask(deleteId);
    dispatch(removeTask(deleteId));

    setDeleteId(null);
    setDeleteModalOpen(false);
  };

  return (
    <div className="container mt-7 md:mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Tasks</h1>

        {/* ADD TASK BUTTON */}
        <ButtonLayout
          variant="primary"
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        >
          + Add Task
        </ButtonLayout>
      </div>

      <PopUpWrapper
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Task" : "Create Task"}
      >
        <TaskForm
          editing={editing}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          clearEditing={() => setEditing(null)}
        />
      </PopUpWrapper>

      <PopUpWrapper
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <p className="text-gray-700 text-sm">
          Are you sure you want to delete this task?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <ButtonLayout variant="danger" onClick={confirmDelete}>
            Delete
          </ButtonLayout>
        </div>
      </PopUpWrapper>

      {/* TASK LIST */}
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={(id) => {
            setDeleteId(id);
            setDeleteModalOpen(true);
          }}
          onEdit={(task) => {
            setEditing(task);
            setModalOpen(true);
          }}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
