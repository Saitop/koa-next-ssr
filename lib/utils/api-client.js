import axios from "axios";

const apiClient = axios.create({
  baseURL: "/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "same-origin",
});

export default apiClient;
