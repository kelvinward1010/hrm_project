import axios from "axios";

import { BASE_URL } from "@/constant/config";
import storage from "@/utils/storage";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 30 * 3, // 90 minutes
});

apiClient.interceptors.request.use(
  function (config) {
    config.headers.Authorization = "Bearer " + storage.getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return Promise.reject(error)
        case 401:
          storage.clearToken();
          window.location.reload();
          return Promise.reject(error.response)
        case 403:
          return Promise.reject(error.response)
        case 404:
          return Promise.reject(error.response)
        case 422:
          return Promise.reject(error.response)
        case 500:
          return Promise.reject(error)
        default:
          return Promise.reject(error)
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    }
    return Promise.reject(error);
  }
);

export const filterEmptyString = (params: Record<string, any>) => {
  const result: Record<string, any> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "") {
      result[key] = value;
    }
  });

  return result;
};