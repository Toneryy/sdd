import axiosClient from "./client";
import { API_URL } from "../utils/api";

export const getProductKeys = async () => {
  const { data } = await axiosClient.get(`${API_URL}/admin/product-keys`);
  return data;
};

export const addProductKey = async (payload: {
  key_encrypted: string;
  product_id: string;
}) => {
  const { data } = await axiosClient.post(`${API_URL}/admin/product-keys`, payload);
  return data;
};

export const updateProductKey = async (id: string, payload: any) => {
  const { data } = await axiosClient.put(
    `${API_URL}/admin/product-keys/${id}`,
    payload
  );
  return data;
};

export const deleteProductKey = async (id: string) => {
  const { data } = await axiosClient.delete(`${API_URL}/admin/product-keys/${id}`);
  return data;
};
