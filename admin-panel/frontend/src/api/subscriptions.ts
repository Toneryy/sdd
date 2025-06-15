// /src/api/subscriptions.ts
import axios from "axios";
import { API_URL } from "../utils/api";

export const getSubscriptions = async () => {
  const { data } = await axios.get(`${API_URL}/admin/subscriptions`);
  return data;
};

export const addSubscription = async (subscriptionData: any) => {
  const { data } = await axios.post(
    `${API_URL}/admin/subscriptions`,
    subscriptionData
  );
  return data;
};
