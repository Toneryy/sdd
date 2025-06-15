// /src/api/products.ts
import axios from "axios";
import { API_URL } from "../utils/api"; // Импортируем API URL

export const getProducts = async () => {
  const { data } = await axios.get(`${API_URL}/admin/products`);
  return data;
};

export const addProduct = async (productData: any) => {
  const { data } = await axios.post(`${API_URL}/admin/products`, productData);
  return data;
};
