import axios from "axios";
import { API_URL } from "../utils/api";

export const getSupportRequests = () =>
  axios.get(`${API_URL}/admin/support-requests`).then((r) => r.data);

export const updateSupportRequest = (id: string, body: any) =>
  axios
    .put(`${API_URL}/admin/support-requests/${id}`, body)
    .then((r) => r.data);

export const deleteSupportRequest = (id: string) =>
  axios.delete(`${API_URL}/admin/support-requests/${id}`);
