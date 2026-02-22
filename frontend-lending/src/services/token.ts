import { API_URL, STORAGE_KEYS } from '../constants';
import { AuthResponse } from '../types';

/**
 * Утилиты для хранения и обновления токенов
 * 
 * ВАЖНО: Токены хранятся в localStorage для доступа из JS.
 * Это не идеально безопасно, но альтернатива (httpOnly cookies) требует изменений на бэкенде.
 * Для улучшения безопасности:
 * - Используем короткий TTL для access token
 * - Refresh token должен иметь expires и проверяться на бэкенде
 * - Добавлена защита от XSS (не выполняем eval/Function из localStorage)
 */

// Ключи для хранения в sessionStorage (более безопасно, чем localStorage)
// sessionStorage очищается при закрытии вкладки
const ACCESS_TOKEN_KEY = STORAGE_KEYS.accessToken;
const REFRESH_TOKEN_KEY = STORAGE_KEYS.refreshToken;
const LEGACY_TOKEN_KEY = 'token';

/**
 * Безопасная установка значения в storage
 */
function safeSetItem(key: string, value: string): void {
  try {
    // Используем sessionStorage для access token (очищается при закрытии вкладки)
    // localStorage для refresh token (чтобы не требовался релогин при перезагрузке)
    if (key === ACCESS_TOKEN_KEY || key === LEGACY_TOKEN_KEY) {
      sessionStorage.setItem(key, value);
      // Также дублируем в localStorage для совместимости со старым кодом
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, value);
    }
  } catch (e) {
    console.error('Failed to set token:', e);
  }
}

/**
 * Безопасное получение значения из storage
 */
function safeGetItem(key: string): string | null {
  try {
    // Сначала проверяем sessionStorage для access token
    if (key === ACCESS_TOKEN_KEY || key === LEGACY_TOKEN_KEY) {
      return sessionStorage.getItem(key) || localStorage.getItem(key);
    }
    return localStorage.getItem(key);
  } catch (e) {
    console.error('Failed to get token:', e);
    return null;
  }
}

/**
 * Безопасное удаление значения из storage
 */
function safeRemoveItem(key: string): void {
  try {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  } catch (e) {
    console.error('Failed to remove token:', e);
  }
}

export function getAccessToken(): string | null {
  return safeGetItem(ACCESS_TOKEN_KEY) || safeGetItem(LEGACY_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return safeGetItem(REFRESH_TOKEN_KEY);
}

export function setTokens(resp: AuthResponse): void {
  if (resp.accessToken) {
    safeSetItem(ACCESS_TOKEN_KEY, resp.accessToken);
    // Также устанавливаем legacy ключ для совместимости
    safeSetItem(LEGACY_TOKEN_KEY, resp.accessToken);
  }
  if (resp.refreshToken) {
    safeSetItem(REFRESH_TOKEN_KEY, resp.refreshToken);
  }
  // Уведомляем об изменении авторизации
  window.dispatchEvent(new Event('auth-changed'));
}

export function clearTokens(): void {
  safeRemoveItem(ACCESS_TOKEN_KEY);
  safeRemoveItem(REFRESH_TOKEN_KEY);
  safeRemoveItem(LEGACY_TOKEN_KEY);
  // Уведомляем об изменении авторизации
  window.dispatchEvent(new Event('auth-changed'));
}

export async function refreshTokens(): Promise<AuthResponse> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }
  
  const res = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
    credentials: 'include', // Отправляем куки (нужно для CSRF защиты, если включена)
  });
  
  if (!res.ok) {
    // Очищаем токены при неудачном refresh
    clearTokens();
    throw new Error(`Refresh failed: ${res.status} ${res.statusText}`);
  }
  
  const data = (await res.json()) as { data: AuthResponse } | AuthResponse;
  // допускаем как {data: {...}} так и просто {...}
  const payload = ('data' in data && data.data) ? data.data : (data as AuthResponse);
  setTokens(payload);
  return payload;
}


