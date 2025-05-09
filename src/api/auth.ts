import axios from "axios";

const API_URL = "https://sdd-egvz.onrender.com";

export const register = async (data: {
  username: string;
  email: string;
  phone: string;
  password: string;
}) => {
  return axios.post(`${API_URL}/api/auth/register`, data);
};

export const login = async (data: { email: string; password: string }) => {
  return axios.post(`${API_URL}/api/auth/login`, data);
};
