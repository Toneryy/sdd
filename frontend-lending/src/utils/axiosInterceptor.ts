/**
 * Глобальный interceptor для axios
 * Обрабатывает ошибки авторизации в старых API файлах
 * ВАЖНО: Не вызываем handleAuthError здесь, чтобы избежать двойной обработки
 * Ошибки 401 обрабатываются в services/api.ts через handleAuthError
 */
import axios from 'axios';

let isInterceptorSetup = false;

export function setupAxiosInterceptor() {
  if (isInterceptorSetup) return;
  isInterceptorSetup = true;

  // Response interceptor для логирования ошибок (опционально)
  // Основная обработка 401 происходит в services/api.ts
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Логируем ошибки для отладки
      if (error.response?.status === 401) {
        console.debug('Axios 401 error intercepted - handled by api.ts');
      }
      return Promise.reject(error);
    }
  );
}
