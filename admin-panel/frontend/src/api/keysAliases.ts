import axiosClient from "./client";
import { API_URL } from "../utils/api";

export const getKeysAliases = async (page = 1, limit = 20) => {
  const { data } = await axiosClient.get(`${API_URL}/admin/keys-aliases`, {
    params: { page, limit },
  });
  return data; // { data, total, page, pages }
};

export const deleteKeysAlias = async (id: string) => {
  const { data } = await axiosClient.delete(`${API_URL}/admin/keys-aliases/${id}`);
  return data;
};
