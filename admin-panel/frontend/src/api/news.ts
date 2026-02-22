import axiosClient from "./client";
import { API_URL } from "../utils/api";

export const getNews = () =>
  axiosClient.get(`${API_URL}/admin/news`).then((r) => r.data);

export const addNews = (body: any) =>
  axiosClient.post(`${API_URL}/admin/news`, body).then((r) => r.data);

export const updateNews = (id: string, body: any) =>
  axiosClient.put(`${API_URL}/admin/news/${id}`, body).then((r) => r.data);

export const deleteNews = (id: string) =>
  axiosClient.delete(`${API_URL}/admin/news/${id}`).then((r) => r.data);
