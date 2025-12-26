import axios from "axios";

export const PUBLIC_API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: false,
});

// Example usage:
// const { data } = await PUBLIC_API.get("/services/");
// await PUBLIC_API.post("/leads/", payload);
