import type { Task } from "../../types/TaskTypes";
import axiosInstance from "../axiosInstance";

export const taskService = {
  fetchTasks: async () => {
    const res = await axiosInstance.get("/tasks");

    return res.data?.data as Task[];
  },

  createTask: async (payload: Partial<Task>) => {
    const res = await axiosInstance.post("/tasks", payload);

    return res.data as Task;
  },

  updateTask: async (id: string, payload: Partial<Task>) => {
    const res = await axiosInstance.put(`/tasks/${id}`, payload);
    return res.data as Task;
  },

  deleteTask: async (id: string) => {
    const res = await axiosInstance.delete(`/tasks/${id}`);
    return res.data;
  },
};
