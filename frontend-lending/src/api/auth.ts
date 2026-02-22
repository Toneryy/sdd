import axios, { AxiosResponse } from "axios";
import { API_URL } from "utils/api";
import { ApiResponse, AuthResponse, LoginCredentials, RegisterData } from "../types";

export const register = async (
  data: RegisterData & { phone: string }
): Promise<AxiosResponse<ApiResponse<AuthResponse>>> => {
  return axios.post<ApiResponse<AuthResponse>>(`${API_URL}/api/auth/register`, data);
};

export const login = async (
  data: LoginCredentials
): Promise<AxiosResponse<ApiResponse<AuthResponse>>> => {
  return axios.post<ApiResponse<AuthResponse>>(`${API_URL}/api/auth/login`, data);
};
