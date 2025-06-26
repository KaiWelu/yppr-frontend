import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// this is a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 403) {
      toast.error("You are not authorized!");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
  }
);

export default api;
