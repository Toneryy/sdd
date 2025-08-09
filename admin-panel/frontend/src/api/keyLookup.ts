import axiosClient from "./client";
import { API_URL } from "../utils/api";

export const lookupKey = async (raw: string) => {
  const { data } = await axiosClient.get(`${API_URL}/admin/key-lookup/${raw}`);
  return data; // {key_encrypted, code, used, product, created_at…}
};
