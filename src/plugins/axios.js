import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://user-management-api.local", // Replace with your API base URL
  timeout: 12000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error("Axios Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default {
  install: (app) => {
    app.config.globalProperties.$axios = axiosInstance;
    app.provide("axios", axiosInstance); // Optionally provide for composition API
  },
};
