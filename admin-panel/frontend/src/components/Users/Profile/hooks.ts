import { useEffect, useState, useCallback } from "react";
import { getUserProfile } from "../../../api/profile";
import { updateSupportRequest as updateSupportRequestApi } from "../../../api/supportRequests";
import { getStaffMembers } from "../../../api/staffMembers";

/* ---------- типы (экспортируем!) ---------- */

export interface SubscriptionPlan {
  title?: string;
  description?: string;
  duration_days?: number;
  price?: number;
}

export interface UserSub {
  id: string;
  subscriptions?: SubscriptionPlan;
  active: boolean;
  start_date: string;
  end_date: string;
}

export interface ProductInfo {
  name?: string;
  denomination?: string;
  description?: string;
  price?: number;
}

export interface Product {
  id: string;
  products?: ProductInfo;
  code?: string;
  added_at: string;
}

export interface SupportRequest {
  id: string;
  title: string;
  description?: string;
  status?: string;
  created_at: string;
  operator_description?: string;
  operator_id?: string | null;
}

/* ---------- хук ---------- */

export function useProfileData(userId: string | undefined) {
  const [user, setUser] = useState<any | null>(null);
  const [subs, setSubs] = useState<UserSub[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getUserProfile(userId);
      setUser(data.user);
      setSubs(data.subscriptions ?? []);
      setProducts(data.products ?? []);
      setRequests(data.supportRequests ?? []);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateRequest = async (
    payload: Pick<
      SupportRequest,
      "operator_description" | "operator_id" | "status"
    >,
    requestId: string
  ) => {
    const updated = await updateSupportRequestApi(requestId, payload);
    setRequests((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    getStaffMembers().then(setStaff).catch(console.error);
  }, []);

  return { user, subs, products, requests, staff, loading, updateRequest };
}
