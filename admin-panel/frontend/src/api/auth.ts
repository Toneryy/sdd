// src/api/auth.ts
import axios from "axios";
import { API_URL } from "../utils/api";

export type Role = "administrator" | "operator";

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
}

const axiosAuth = axios.create({
  baseURL: `${API_URL}/auth`,
  withCredentials: true, // шлём/принимаем httpOnly куку
});

export async function meApi(): Promise<User> {
  const { data } = await axiosAuth.get<User>("/me");
  return data;
}

export async function loginApi(
  username: string,
  password: string
): Promise<User> {
  const { data } = await axiosAuth.post<User>("/login", { username, password });
  return data;
}

export async function registerApi(payload: {
  username: string;
  email: string;
  role: Role;
  password: string;
}): Promise<User> {
  const { data } = await axiosAuth.post<User>("/register", payload);
  return data;
}

export async function logoutApi(): Promise<void> {
  await axiosAuth.post("/logout");
}
