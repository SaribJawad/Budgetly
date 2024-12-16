import axios from "axios";

export const api = axios.create({
  baseURL: "/api/v1/",
  withCredentials: true,
});

// // Handle unauthorized responses
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // REMOVE LATER
//     console.log("Interceptor caught error:", {
//       status: error.response?.status,
//       data: error.response?.data,
//       headers: error.response?.headers,
//     });

//     // Check if it's an actual axios error with a response
//     if (!error.response) {
//       console.error("No response received", error);
//       return Promise.reject(error);
//     }

//     const originalRequest = error.config;

//     // Prevent infinite loops by checking retry flag
//     if (error.response.status === 400) {
//       if (originalRequest._retry) {
//         console.log("Already tried to refresh token, redirecting to login");
//         window.location.href = "/auth/login";
//         return Promise.reject(error);
//       }

//       originalRequest._retry = true;

//       try {
//         console.log("Attempting to refresh token");
//         const refreshResponse = await axios.post(
//           "/api/v1/users/refresh-token",
//           {},
//           {
//             baseURL: "/api/v1",
//             withCredentials: true,
//           }
//         );

//         console.log("Token refresh successful", refreshResponse.data);

//         // Retry the original request
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Token refresh failed", refreshError);

//         // Ensure we redirect to login on refresh failure
//         window.location.href = "/auth/login";
//         return Promise.reject(refreshError);
//       }
//     }

//     // For other types of errors, just reject
//     return Promise.reject(error);
//   }
// );
