"use client";
import axios from "axios";

const data =
  typeof window !== "undefined" ? localStorage.getItem("userData") : "{}";

const parsedData = JSON.parse(data || "{}");

// Создание экземпляра Axios с предустановленными конфигурациями
export const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000/",
  baseURL: "https://meet-my-box-production.up.railway.app/",
});

// Добавление интерсептора для вставки JWT в заголовки каждого запроса
axiosInstance.interceptors.request.use(
  (config) => {
    // Получение токена из локального хранилища
    const token = parsedData.access;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавление интерсептора ответа для обработки истечения токена
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = parsedData.refresh;
      // console.log("my refresh", refreshToken);

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${axiosInstance.defaults.baseURL}api/access`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          if (res.status === 201) {
            // Update both localStorage and in-memory parsedData
            localStorage.setItem("accessToken", res.data.access);
            parsedData.access = res.data.access;

            axiosInstance.defaults.headers.common["Authorization"] =
              `Bearer ${res.data.access}`;
            originalRequest.headers["Authorization"] =
              `Bearer ${res.data.access}`;

            // Retry the original request with the new token
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Unable to refresh token:", refreshError);

          // Clear tokens and handle error
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return Promise.reject(refreshError);
        }
      } else {
        console.error("No refresh token available");

        // Clear tokens and handle error
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
