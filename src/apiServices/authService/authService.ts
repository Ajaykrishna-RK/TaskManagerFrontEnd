import axiosInstance from "../axiosInstance";


export const authService = {
  login: async (payload: { email: string; password: string }) => {
    const res = await axiosInstance.post("/auth/login", payload);
    return res.data;
  },

  register: async (payload: { name: string; email: string; password: string }) => {
    const res = await axiosInstance.post("/auth/register", payload);
    return res.data;
  }
};
