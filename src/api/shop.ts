// src/api/shop.ts
import axios, { AxiosResponse } from "axios";
import { API_URL } from "utils/api";

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  img?: string;
  description?: string;
  available: number;
}

// GET /api/shop/categories
export const fetchCategories = (): Promise<AxiosResponse<Category[]>> =>
  axios.get<Category[]>(`${API_URL}/api/shop/categories`);

// GET /api/shop/products?minPrice=&maxPrice=&categoryId=
export const fetchProducts = (
  minPrice: string,
  maxPrice: string,
  categoryId: string,
  inStock: boolean
): Promise<AxiosResponse<Product[]>> =>
  axios.get<Product[]>(`${API_URL}/api/shop/products`, {
    params: {
      minPrice: minPrice || "0",
      // если не передали max, ставим очень большое
      maxPrice: maxPrice || String(Number.MAX_SAFE_INTEGER),
      ...(categoryId ? { categoryId } : {}),
      inStock: inStock ? 1 : 0,
    },
  });

// GET /api/shop/products/:id
export const fetchProductById = (id: string): Promise<AxiosResponse<Product>> =>
  axios.get<Product>(`${API_URL}/api/shop/products/${id}`);
