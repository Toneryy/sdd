import axios from "axios";
import { API_URL } from "../utils/api";

export const getKeysAliases = async (page = 1, limit = 20) => {
  const { data } = await axios.get(`${API_URL}/admin/keys-aliases`, {
    params: { page, limit },
  });
  return data; // { data, total, page, pages }
};

export const deleteKeysAlias = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/admin/keys-aliases/${id}`);
  return data;
};
