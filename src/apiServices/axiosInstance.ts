import axios from "axios";

const base = import.meta.env.VITE_API_URL || "http://localhost:8080/api/";

const axiosInstance = axios.create({
  baseURL: base,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicRoutes = ["auth/login", "auth/register"];

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isPublic = publicRoutes.some((route) =>
      config.url?.startsWith(route)
    );

    if (!isPublic && !token) {
      throw new Error("Unauthorized: Token missing");
    }
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
