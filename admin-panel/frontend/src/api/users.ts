import axiosClient from "./client";
import { API_URL } from "../utils/api";

export const getUsers = async () => {
  const { data } = await axiosClient.get(`${API_URL}/admin/users`);
  return data;
};

export const addUser = async (u: any) => {
  const { data } = await axiosClient.post(`${API_URL}/admin/users`, u);
  return data;
};

export const updateUser = async (id: string, patch: any) => {
  const { data } = await axiosClient.put(`${API_URL}/admin/users/${id}`, patch);
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await axiosClient.delete(`${API_URL}/admin/users/${id}`);
  return data;
};

export const updateServiceOrder = async (id: string, data: any) => {
  const res = await axiosClient.put(`${API_URL}/admin/orders/${id}`, data);
  return res.data;
};

export const getStaffMembers = async () => {
  const res = await axiosClient.get(`${API_URL}/admin/staff-members`);
  return res.data;
};

export const searchUsers = async (q: string) => {
  const { data } = await axiosClient.get(`${API_URL}/admin/users/search`, {
    params: { q },
  });
  return data as {
    id: string;
    username: string;
    email: string;
    phone: string | null;
  }[];
};
