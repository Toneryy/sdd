// frontend/src/api/profile.ts
import axios from 'axios'

const API_URL = 'http://localhost:4000'

export const fetchProfile = async (token: string) => {
  return axios.get(`${API_URL}/api/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
