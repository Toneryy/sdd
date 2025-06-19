import axios from "axios";
import { API_URL } from "../utils/api";

export const getUsers = async () => {
  const { data } = await axios.get(`${API_URL}/admin/users`);
  return data;
};

export const addUser = async (u: any) => {
  const { data } = await axios.post(`${API_URL}/admin/users`, u);
  return data;
};

export const updateUser = async (id: string, patch: any) => {
  const { data } = await axios.put(`${API_URL}/admin/users/${id}`, patch);
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/admin/users/${id}`);
  return data;
};
