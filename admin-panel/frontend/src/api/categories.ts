// /src/api/categories.ts
import axios from "axios";
import { API_URL } from "../utils/api";

export const getCategories = async () => {
  const { data } = await axios.get(`${API_URL}/admin/categories`);
  return data;
};

export const addCategory = async (categoryData: any) => {
  const { data } = await axios.post(
    `${API_URL}/admin/categories`,
    categoryData
  );
  return data;
};
