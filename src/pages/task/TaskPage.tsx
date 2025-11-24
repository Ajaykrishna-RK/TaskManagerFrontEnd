import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
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
import Loading from "../../components/loading/Loading";
import InputField from "../../components/common/InputField";
import Pagination from "../../components/common/Pagination";
import TextComponent from "../../components/common/TextComponent";

export default function TaskPage() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((s: RootState) => s.tasks);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [sort, setSort] = useState("-createdAt");
  const [pagination, setPagination] = useState<any>(null);
  const queryParams = useMemo(
    () => ({ page, limit, sort }),
    [page, limit, sort]
  );
  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { tasks, pagination } = await taskService.fetchTasks(queryParams);
      dispatch(setTasks(tasks));
      setPagination(pagination);
    } finally {
      setLoading(false);
    }
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);
  const handleCreate = useCallback(
    async (form: Partial<Task>) => {
      const created = await taskService.createTask(form);
      dispatch(addTask(created));
      setModalOpen(false);
    },
    [dispatch]
  );
  const handleUpdate = useCallback(
    async (form: Partial<Task>) => {
      if (!editing) return;

      const updated = await taskService.updateTask(editing._id!, form);
      dispatch(updateTask(updated));
      setModalOpen(false);
      setEditing(null);
    },
    [dispatch, editing]
  );

  const handleStatusChange = useCallback(
    async (id: string, status: Task["status"]) => {
      const updated = await taskService.updateTask(id, { status });
      dispatch(updateTask(updated));
    },
    [dispatch]
  );
  const confirmDelete = useCallback(async () => {
    if (!deleteId) return;

    await taskService.deleteTask(deleteId);
    dispatch(removeTask(deleteId));

    setDeleteId(null);
    setDeleteModalOpen(false);
  }, [deleteId, dispatch]);

  return (
    <div className="container mt-7 md:mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
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

      <div className="flex max-w-[200px] my-2">
        <InputField
          placeholder="Sort By"
          className="mt-2"
          type="select"
          options={[
            { value: "-createdAt", label: "Latest" },
            { value: "createdAt", label: "Oldest" },
            { value: "priority", label: "Priority" },
            { value: "status", label: "Status" },
          ]}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        />
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
        {" "}
        <div className=" flex-col justify-center items-center flex">
          <TextComponent text="Are you sure you want to delete this task?" />
          <div className="flex justify-end gap-3 mt-6">
            <ButtonLayout variant="danger" onClick={confirmDelete}>
              Delete
            </ButtonLayout>
          </div>
        </div>
      </PopUpWrapper>

      {loading ? (
        <Loading />
      ) : (
        <>
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

          {pagination && (
            <div className="justify-end items-end flex py-10">
            <Pagination
              page={page}
              total={pagination.total}
              limit={pagination.limit}
              onPageChange={setPage}
            />
            </div>
          )}
        </>
      )}
    </div>
  );
}
