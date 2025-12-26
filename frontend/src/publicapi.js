import axios from "axios";

export const PUBLIC_API = axios.create({
  baseURL: "https://fullstackwebsite-production.up.railway.app",
  withCredentials: false,
});

// Example usage:
// const { data } = await PUBLIC_API.get("/services/");
// await PUBLIC_API.post("/leads/", payload);
