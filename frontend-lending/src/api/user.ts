import axios from "axios";
import { API_URL } from "utils/api";

export const fetchProfile = async (token: string) => {
  return axios.get(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
