import axios from "axios";

export const API_BASE = "https://fullstackwebsite-production.up.railway.app";

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const t = localStorage.getItem("token");
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export default api;
