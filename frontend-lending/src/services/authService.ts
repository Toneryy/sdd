import { api } from './api';
import { ApiResponse, AuthResponse, LoginCredentials, RegisterData } from '../types';
import { setTokens, clearTokens } from './token';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await api.post<ApiResponse<AuthResponse>>('/api/auth/login', credentials, { auth: false });
    setTokens(res.data);
    return res.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const res = await api.post<ApiResponse<AuthResponse>>('/api/auth/register', data, { auth: false });
    setTokens(res.data);
    return res.data;
  },

  async logout(): Promise<void> {
    try { await api.post('/api/auth/logout', {}, { retry: 0 }); } catch {}
    finally {
      clearTokens();
    }
  },
};


