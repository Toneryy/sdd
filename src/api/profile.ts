// frontend/src/api/profile.ts
import axios from 'axios'
import { API_URL } from "utils/api";

export const fetchProfile = async (token: string) => {
  return axios.get(`${API_URL}/api/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
