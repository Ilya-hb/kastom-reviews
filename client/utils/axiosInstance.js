import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.end.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
