import { API_URL, STORAGE_KEYS } from '../constants';
import { AuthResponse } from '../types';

/**
 * Утилиты для хранения и обновления токенов
 */
export function getAccessToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.accessToken) || localStorage.getItem('token');
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.refreshToken);
}

export function setTokens(resp: AuthResponse): void {
  if (resp.accessToken) localStorage.setItem(STORAGE_KEYS.accessToken, resp.accessToken);
  if (resp.refreshToken) localStorage.setItem(STORAGE_KEYS.refreshToken, resp.refreshToken);
}

export function clearTokens(): void {
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem('token');
}

export async function refreshTokens(): Promise<AuthResponse> {
  const refreshToken = getRefreshToken();
  const res = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) {
    throw new Error(`Refresh failed: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as { data: AuthResponse } | AuthResponse;
  // допускаем как {data: {...}} так и просто {...}
  const payload = (data as any).data ?? data;
  setTokens(payload);
  return payload as AuthResponse;
}


