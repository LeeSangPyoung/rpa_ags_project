import { useAuthStore } from './../stores/useAuthStore';
import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../constants/constants";

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 1000,
});

instance.interceptors.request.use((config) => {

  const jwtToken = localStorage.getItem("jwtToken")

  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  const authStore = useAuthStore.getState()
  const status = response?.data?.status
  const messageId = response?.data?.messageId

  if (status === 401 || status === 403) {
    authStore.logout()
    return Promise.reject({
      status: status,
      messageId: "E008"
    })
  }
  if(messageId?.startsWith("E")){
    return Promise.reject(response.data)
  }

  return response.data;
}, function (error) {
  return Promise.reject({
    status: 0,
    messageId: "E000"
  });
});

export default instance