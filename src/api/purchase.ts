// frontend/src/api/purchase.ts
import axios from "axios";
import { API_URL } from "utils/api";

export type CartItemPayload =
  | { type: "product"; productId: string; qty: number }
  | { type: "subscription"; subscriptionId: string; qty?: number };

export type CheckoutResponse = {
  orderId: string;
  orderNumber: string;
  status: "pending";
};

export async function createOrder(userId: string, items: CartItemPayload[]) {
  const { data } = await axios.post<CheckoutResponse>(
    `${API_URL}/api/purchase/checkout`,
    { userId, items }
  );
  return data;
}

export type OrderItemDTO = {
  id: string;
  type: "product" | "subscription";
  productId: string | null;
  subscriptionId: string | null;
  qty: number;
  aliases: string[]; // только активные alias (после оплаты/активации)
};

export type OrderStatusResponse = {
  orderId: string;
  orderNumber: string;
  status:
    | "pending"
    | "awaiting_payment"
    | "paid"
    | "failed"
    | "cancelled"
    | "refunded"
    | "expired";
  items: OrderItemDTO[];
  createdAt: string;
  updatedAt: string;
};

export async function getOrderStatus(idOrNumber: string) {
  const { data } = await axios.get<OrderStatusResponse>(
    `${API_URL}/api/purchase/order/${idOrNumber}`
  );
  return data;
}

export async function activateCode(code: string, userId: string) {
  const { data } = await axios.post(`${API_URL}/api/purchase/activate`, {
    code,
    userId,
  });
  return data as { productId: string; key: string };
}
