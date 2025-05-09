// src/api/subscriptions.ts
import axios from "axios";

export interface Subscription {
  id: string;
  title: string;
  description: string | null;
  duration_days: number;
  price: string;
  image?: string;
}

const API_URL = process.env.REACT_APP_API_URL || "https://sdd-egvz.onrender.com";

export const fetchSubscriptions = () =>
  axios.get<Subscription[]>(`${API_URL}/api/subscriptions`);

export const getSubscriptionById = (id: string) =>
    axios.get(`${API_URL}/api/subscriptions/${id}`);