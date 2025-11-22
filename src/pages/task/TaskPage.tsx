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

export default function TaskPage() {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((s: RootState) => s.tasks);

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

  const handleDelete = async (id: string) => {
    await taskService.deleteTask(id);
    dispatch(removeTask(id));
  };

  const handleStatusChange = async (id: string, status: Task["status"]) => {
    const updated = await taskService.updateTask(id, { status });
    dispatch(updateTask(updated));
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>

      {/* ADD TASK BUTTON */}
      <button
        onClick={() => {
          setEditing(null);
          setModalOpen(true);
        }}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Task
      </button>

      {/* POPUP / MODAL */}
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

      {/* TASK LIST */}
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
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
