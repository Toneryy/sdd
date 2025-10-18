// frontend/src/api/payments.dev.ts
import axios from "axios";
import { API_URL } from "utils/api";

export type DevCreatePaymentResponse = {
  orderId: string;
  orderNumber: string;
  status: "awaiting_payment" | "paid";
  providerOrderId?: string | null;
  amount?: number;
  currency?: string;
};

export async function devCreatePayment(idOrNumber: string) {
  const { data } = await axios.post<DevCreatePaymentResponse>(
    `${API_URL}/api/purchase/dev/create-payment/${idOrNumber}`
  );
  return data;
}

export type DevPayResponse = {
  orderId: string;
  orderNumber: string;
  status: "paid";
  aliases: Array<{ code: string; productId: string; orderItemId: string }>;
};

export async function devPay(idOrNumber: string) {
  const { data } = await axios.post<DevPayResponse>(
    `${API_URL}/api/purchase/dev/pay/${idOrNumber}`
  );
  return data;
}
