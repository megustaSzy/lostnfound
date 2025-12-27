import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    if (
      status === 401 &&
      !url?.includes("/auth/login") &&
      !url?.includes("/auth/refresh")
    ) {
      try {
        await api.post("/api/auth/refresh");
        return api(error.config);
      } catch {
        return Promise.reject(error);
      }
    }

    // ⬅️ PENTING: lempar error ke FE
    return Promise.reject(error);
  }
);
