/**
 * Централизованные типы TypeScript для лендинга.
 * Описывает сущности, ответы API и полезные утилиты типов.
 */

export interface User {
  id: string;
  email: string;
  username: string;
  phone: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  img?: string; // alias для обратной совместимости
  category?: string;
  available: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  phone?: string;
}

export type Id = string | number;

// Новости
export interface News {
  id: string;
  title: string;
  description?: string;
  image?: string;
  content?: string;
  styles?: string;
  published?: boolean;
  created_at: string;
}

// Посты (лендинг/админ)
export interface Post {
  id: string;
  raw_html?: string | null;
  description?: string | null;
  image?: string | null;
  button_text?: string | null;
  button_href?: string | null;
  updatedAt: string;
}

export interface Draft {
  id: string;
  raw_html?: string | null;
  description?: string | null;
  image?: string | null;
  button_text?: string | null;
  button_href?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Корзина
export interface CartItem {
  id: string;
  name: string;
  price: number;
  img?: string;
  quantity: number;
  available: number;
}

// API Error types
export interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface AxiosErrorLike {
  response?: {
    data?: ApiErrorResponse;
    status?: number;
    statusText?: string;
  };
  message?: string;
}

// Profile types
export interface SupportTicket {
  id: string;
  title: string;
  status: 'pending' | 'active' | 'closed';
  createdAt?: string;
  created_at?: string; // для обратной совместимости
  updatedAt?: string;
  updated_at?: string; // для обратной совместимости
  description?: string;
}

export interface Subscription {
  title: string;
  [key: string]: unknown;
}

export interface ActiveSubscription {
  subscriptions?: Subscription;
  end_date?: string;
  [key: string]: unknown;
}

export interface ProfileUser {
  email?: string;
  phone?: string;
  [key: string]: unknown;
}

export interface ProfileData {
  id?: string;
  email?: string;
  username?: string;
  phone?: string;
  user?: ProfileUser;
  activeSubscription?: ActiveSubscription;
  supportHistory?: SupportTicket[];
  [key: string]: unknown; // для других полей которые могут быть в ответе
}

// Favorite item type (для favoritesStorage)
// Может быть как полный Product, так и упрощенный с id
export interface FavoriteItem {
  id: string;
  name?: string;
  price?: number;
  available?: number;
  img?: string;
  description?: string;
  category?: string;
  [key: string]: unknown; // для других полей
}
