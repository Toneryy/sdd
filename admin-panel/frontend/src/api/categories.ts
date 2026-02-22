import axiosClient from "./client";
import { API_URL } from "../utils/api";

export const getCategories = () =>
  axiosClient.get(`${API_URL}/admin/categories`).then((r) => r.data);
export const addCategory = (body: any) =>
  axiosClient.post(`${API_URL}/admin/categories`, body).then((r) => r.data);
export const updateCategory = (id: string, body: any) =>
  axiosClient.put(`${API_URL}/admin/categories/${id}`, body).then((r) => r.data);
export const deleteCategory = (id: string) =>
  axiosClient.delete(`${API_URL}/admin/categories/${id}`);
