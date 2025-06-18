import axios from "axios";
import { API_URL } from "../utils/api";

export const getCategories = () =>
  axios.get(`${API_URL}/admin/categories`).then((r) => r.data);
export const addCategory = (body: any) =>
  axios.post(`${API_URL}/admin/categories`, body).then((r) => r.data);
export const updateCategory = (id: string, body: any) =>
  axios.put(`${API_URL}/admin/categories/${id}`, body).then((r) => r.data);
export const deleteCategory = (id: string) =>
  axios.delete(`${API_URL}/admin/categories/${id}`);
