/**
 * Константы приложения (API_URL, ключи хранилища, маршруты)
 */

export const API_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const STORAGE_KEYS = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
} as const;

export const ROUTES = {
  home: '/',
  shop: '/shop',
  product: (id: string) => `/product/${id}`,
  profile: '/profile',
  login: '/login',
  register: '/register',
} as const;


