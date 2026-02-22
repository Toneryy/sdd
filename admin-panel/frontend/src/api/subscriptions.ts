import axiosClient from "./client";
import { API_URL } from "../utils/api";

export const getSubscriptions = () =>
  axiosClient.get(`${API_URL}/admin/subscriptions`).then((r) => r.data);
export const addSubscription = (body: any) =>
  axiosClient.post(`${API_URL}/admin/subscriptions`, body).then((r) => r.data);
export const updateSubscription = (id: string, body: any) =>
  axiosClient.put(`${API_URL}/admin/subscriptions/${id}`, body).then((r) => r.data);
export const deleteSubscription = (id: string) =>
  axiosClient.delete(`${API_URL}/admin/subscriptions/${id}`);
