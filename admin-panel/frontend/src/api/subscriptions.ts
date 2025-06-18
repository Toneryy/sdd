import axios from "axios";
import { API_URL } from "../utils/api";

export const getSubscriptions = () =>
  axios.get(`${API_URL}/admin/subscriptions`).then((r) => r.data);
export const addSubscription = (body: any) =>
  axios.post(`${API_URL}/admin/subscriptions`, body).then((r) => r.data);
export const updateSubscription = (id: string, body: any) =>
  axios.put(`${API_URL}/admin/subscriptions/${id}`, body).then((r) => r.data);
export const deleteSubscription = (id: string) =>
  axios.delete(`${API_URL}/admin/subscriptions/${id}`);
