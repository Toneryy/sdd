import axios, { AxiosResponse } from "axios";
import { API_URL } from "utils/api";
import { ApiResponse, User } from "../types";

export const fetchProfile = async (
  token: string
): Promise<AxiosResponse<ApiResponse<User>>> => {
  return axios.get<ApiResponse<User>>(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
