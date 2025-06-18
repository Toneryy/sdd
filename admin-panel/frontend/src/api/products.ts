import axios from "axios";
import { API_URL } from "../utils/api";

// Получение всех продуктов
export const getProducts = async () => {
  const { data } = await axios.get(`${API_URL}/admin/products`);
  return data;
};

// Добавление нового продукта
export const addProduct = async (productData: any) => {
  const { data } = await axios.post(`${API_URL}/admin/products`, productData);
  return data;
};

// Обновление существующего продукта
export const updateProduct = async (productId: string, productData: any) => {
  const { data } = await axios.put(
    `${API_URL}/admin/products/${productId}`,
    productData
  );
  return data;
};

export const deleteProduct = async (id: string) =>
  (await axios.delete(`${API_URL}/admin/products/${id}`)).data;
