// frontend/src/api/profile.ts
import axios from "axios";
import { API_URL } from "utils/api";

export const fetchProfile = async (token: string) => {
  return axios.get(`${API_URL}/api/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export type PurchaseCard = {
  orderId: string;
  orderNumber: string;
  purchasedAt: string;
  productId: string | null;
  name: string | null;
  img?: string | null;
  description?: string | null;
  price?: string | number | null;
  qty: number;
  activatedCount: number;
};

export type PurchasesPage = {
  page: number;
  pageSize: number;
  totalOrders: number;
  ordersCount: number;
  items: PurchaseCard[];
};

export const fetchPurchases = async (
  token: string,
  page = 1,
  pageSize = 12
) => {
  return axios.get<PurchasesPage>(`${API_URL}/api/profile/purchases`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, pageSize },
  });
};
