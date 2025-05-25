// src/api/promocodes.ts
import axios from "axios";
import { API_URL } from "utils/api";

export interface UsedPromo {
  code: string;
  type: "discount" | "topup";
  denomination: number;
}

export const applyPromo = (code: string) =>
  axios.post<{ type: string; denomination: number }>(
    `${API_URL}/api/promocodes/apply`,
    { code },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );

export const fetchUsedPromos = () =>
  axios.get<UsedPromo[]>(`${API_URL}/api/promocodes/used`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const removePromo = (code: string) =>
  axios.delete(`${API_URL}/api/promocodes/${code}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
