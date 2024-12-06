import axios from "axios";

export const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

// Handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "/api/v1/users/refresh-token",
          {},
          { withCredentials: true }
        );
        // Original request will automatically include the new cookie
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token failed - logout user
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
