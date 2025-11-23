import type { Task } from "../../types/TaskTypes";
import axiosInstance from "../axiosInstance";

export const taskService = {
  fetchTasks: async (params?: Record<string, any>) => {
    try {
      const res = await axiosInstance.get("/tasks", { params });

      return {
        tasks: res.data?.data as Task[],
        pagination: res.data?.pagination,
      };
    } catch (error: any) {
      console.error("Fetch Tasks Error:", error);
      throw new Error(error?.response?.data?.message || "Failed to fetch tasks");
    }
  },

  createTask: async (payload: Partial<Task>) => {
    try {
      const res = await axiosInstance.post("/tasks", payload);
      return res.data?.data as Task;
    } catch (error: any) {
      console.error("Create Task Error:", error);
      throw new Error(error?.response?.data?.message || "Failed to create task");
    }
  },

  updateTask: async (id: string, payload: Partial<Task>) => {
    try {
      const res = await axiosInstance.put(`/tasks/${id}`, payload);
      return res.data?.data as Task;
    } catch (error: any) {
      console.error("Update Task Error:", error);
      throw new Error(error?.response?.data?.message || "Failed to update task");
    }
  },

  deleteTask: async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/tasks/${id}`);
      return res.data;
    } catch (error: any) {
      console.error("Delete Task Error:", error);
      throw new Error(error?.response?.data?.message || "Failed to delete task");
    }
  },

  dashboardStats: async () => {
    try {
      const res = await axiosInstance.get("/tasks/dashboard");
      return res.data;
    } catch (error: any) {
      console.error("Dashboard Stats Error:", error);
      throw new Error(
        error?.response?.data?.message || "Failed to fetch dashboard statistics"
      );
    }
  },
};
