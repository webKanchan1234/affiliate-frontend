import axios from "axios";

// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/v1/api";
const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/v1/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Automatically attach JWT token and set Content-Type dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Dynamically set Content-Type based on request data
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Token expired. Redirecting to login...");

      // Clear token and user data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // dispatch(logoutUserAction());
      // Redirect to home page
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
