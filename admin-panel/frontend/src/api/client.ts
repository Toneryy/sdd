// src/api/client.ts
import axios from "axios";
import { API_URL } from "../utils/api";

const axiosClient = axios.create({
  baseURL: API_URL, // "http://localhost:4001/api"
  withCredentials: true, // <<< ОБЯЗАТЕЛЬНО
});

export default axiosClient;
