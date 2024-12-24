import axios from "axios";
import { store } from "@/app/store";
import { logout } from "@/features/auth/authSlice";

export const api = axios.create({
  baseURL: "/api/v1/",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request has already been retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // If refresh is in progress, add request to queue
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Call your refresh token endpoint
      await api.post("/auth/refresh");

      isRefreshing = false;
      processQueue(null, "refreshed");

      // Retry the original request
      return api(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      processQueue(refreshError, null);

      // If refresh fails, logout user
      store.dispatch(logout());
      return Promise.reject(refreshError);
    }
  }
);

export default api;
