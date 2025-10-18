// src/api/subscriptions.ts
import axios from "axios";
import { API_URL } from "utils/api";

export interface Subscription {
  id: string;
  title: string;
  description: string | null;
  duration_days: number;
  price: string;
  image?: string;
}

export const fetchSubscriptions = () =>
  axios.get<Subscription[]>(`${API_URL}/api/subscriptions`);

export const getSubscriptionById = (id: string) =>
    axios.get(`${API_URL}/api/subscriptions/${id}`);