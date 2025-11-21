import axiosInstance from "../axiosInstance";

export const authService = {
  login: async (payload: { email: string; password: string }) => {
    try {
      const res = await axiosInstance.post("auth/login", payload);
      return res.data;
    } catch (error: any) {
      console.log(error, "errro");
      throw error.response?.data || { message: "Login failed" };
    }
  },

  register: async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await axiosInstance.post("auth/register", payload);
      return res.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Registration failed" };
    }
  },
};
