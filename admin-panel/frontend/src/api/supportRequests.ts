import axiosClient from "./client";
import { API_URL } from "../utils/api";

export const getSupportRequests = () =>
  axiosClient.get(`${API_URL}/admin/support-requests`).then((r) => r.data);

export async function updateSupportRequest(
  requestId: string,
  payload: {
    operator_description?: string;
    operator_id?: string | null;
    status?: string;
  }
) {
  const { data } = await axiosClient.put(
    `/admin/support-requests/${requestId}`,
    payload
  );
  return data;
}

export const deleteSupportRequest = (id: string) =>
  axiosClient.delete(`${API_URL}/admin/support-requests/${id}`);
