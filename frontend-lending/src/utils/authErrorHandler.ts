/**
 * Централизованная обработка ошибок авторизации
 * Предотвращает множественные уведомления об истекшей сессии
 */
import { toast } from 'react-toastify';
import type { AxiosErrorLike } from '../types';
import { clearTokens } from '../services/token';

let isLoggingOut = false;
let lastLogoutTime = 0;
const LOGOUT_DEBOUNCE_MS = 2000; // 2 секунды между уведомлениями

const TOAST_ID = 'session-expired';

export function handleAuthError(error: unknown, onLogout?: () => void, redirectToLogin = true) {
  // Проверяем что это действительно ошибка авторизации
  const isAuthError = 
    (error instanceof Error && (
      error.message.includes('401') ||
      error.message.includes('unauthorized') ||
      error.message.includes('Токен') ||
      error.message.includes('токен') ||
      error.message.includes('Refresh failed')
    )) ||
    (typeof error === 'object' && error !== null && 'response' in error && 
     (error as AxiosErrorLike).response?.status === 401);

  if (!isAuthError) return false;

  const now = Date.now();
  
  // Если уже идет процесс логаута или недавно был логаут - пропускаем
  if (isLoggingOut || (now - lastLogoutTime < LOGOUT_DEBOUNCE_MS)) {
    return true; // Уже обрабатываем
  }

  isLoggingOut = true;
  lastLogoutTime = now;

  // Очищаем токены сразу
  clearTokens();
  
  // Вызываем переданный onLogout если есть
  onLogout?.();

  // Показываем только одно уведомление
  if (!toast.isActive(TOAST_ID)) {
    toast.error('Сессия истекла. Пожалуйста, войдите заново.', {
      toastId: TOAST_ID,
      autoClose: 3000,
    });
  }

  // Редиректим на логин через небольшую задержку
  if (redirectToLogin && window.location.pathname !== '/login') {
    setTimeout(() => {
      isLoggingOut = false;
      window.location.href = '/login';
    }, 500);
  } else {
    isLoggingOut = false;
  }

  return true;
}

export function resetAuthErrorHandler() {
  isLoggingOut = false;
  lastLogoutTime = 0;
}
