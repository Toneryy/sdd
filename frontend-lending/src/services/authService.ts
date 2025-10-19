import { api } from './api';
import { ApiResponse, AuthResponse, LoginCredentials, RegisterData } from '../types';
import { STORAGE_KEYS } from '../constants';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await api.post<ApiResponse<AuthResponse>>('/api/auth/login', credentials, { auth: false });
    localStorage.setItem(STORAGE_KEYS.accessToken, res.data.accessToken);
    if (res.data.refreshToken) localStorage.setItem(STORAGE_KEYS.refreshToken, res.data.refreshToken);
    return res.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const res = await api.post<ApiResponse<AuthResponse>>('/api/auth/register', data, { auth: false });
    localStorage.setItem(STORAGE_KEYS.accessToken, res.data.accessToken);
    if (res.data.refreshToken) localStorage.setItem(STORAGE_KEYS.refreshToken, res.data.refreshToken);
    return res.data;
  },

  async logout(): Promise<void> {
    try { await api.post('/api/auth/logout', {}, { retry: 0 }); } catch {}
    finally {
      localStorage.removeItem(STORAGE_KEYS.accessToken);
      localStorage.removeItem(STORAGE_KEYS.refreshToken);
    }
  },
};


