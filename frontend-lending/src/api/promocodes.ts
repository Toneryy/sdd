// src/api/promocodes.ts
import axios from "axios";
import { API_URL } from "utils/api";
import { getAccessToken } from "../services/token";

export interface UsedPromo {
  code: string;
  type: "discount" | "topup";
  denomination: number;
}

export const applyPromo = (code: string) => {
  const token = getAccessToken();
  if (!token) throw new Error("Токен авторизации не найден");
  
  return axios.post<{ type: string; denomination: number }>(
    `${API_URL}/api/promocodes/apply`,
    { code },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const fetchUsedPromos = () => {
  const token = getAccessToken();
  if (!token) throw new Error("Токен авторизации не найден");
  
  return axios.get<UsedPromo[]>(`${API_URL}/api/promocodes/used`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const removePromo = (code: string) => {
  const token = getAccessToken();
  if (!token) throw new Error("Токен авторизации не найден");
  
  return axios.delete(`${API_URL}/api/promocodes/${code}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
