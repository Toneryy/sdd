import { API_URL } from '../constants';
import { getAccessToken, refreshTokens, clearTokens } from './token';
import { handleAuthError } from '../utils/authErrorHandler';
import { AuthResponse } from '../types';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions extends RequestInit {
  auth?: boolean;
  retry?: number;
  timeoutMs?: number;
  asJson?: boolean;
  skipAuthError?: boolean; // Для запросов, где не нужно показывать ошибку авторизации
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let isRefreshing = false;
let refreshPromise: Promise<AuthResponse> | null = null;

export class ApiService {
  private baseURL = API_URL;
  private csrfToken: string | null = null; // CSRF токен для защиты (если включена на бэкенде)

  async request<T>(
    endpoint: string,
    { auth = true, retry = 2, timeoutMs = 15000, asJson = true, skipAuthError = false, ...init }: RequestOptions = {}
  ): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;
    const headers = new Headers(init.headers);

    if (asJson && !(init.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    if (auth) {
      const token = getAccessToken();
      if (token) headers.set('Authorization', `Bearer ${token}`);
    }

    // Добавляем CSRF токен в заголовок (если он есть)
    // Токен устанавливается сервером в заголовке X-CSRF-Token при GET запросах
    if (this.csrfToken) {
      headers.set('X-CSRF-Token', this.csrfToken);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const doFetch = async (): Promise<Response> => {
      return fetch(url, { 
        ...init, 
        headers, 
        signal: controller.signal,
        credentials: 'include' // Важно: отправляем куки (нужно для CSRF защиты)
      });
    };

    // Если идет refresh, ждем его завершения
    if (isRefreshing && refreshPromise) {
      await refreshPromise;
      // Обновляем токен в заголовках
      if (auth) {
        const token = getAccessToken();
        if (token) headers.set('Authorization', `Bearer ${token}`);
      }
    }

    let attempt = 0;

    while (attempt <= retry) {
      try {
        const res = await doFetch();
        clearTimeout(timeout);

        if (res.status === 401 && auth) {
          // Пытаемся обновить токен только один раз
          if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refreshTokens()
              .then((authRes) => {
                isRefreshing = false;
                refreshPromise = null;
                return authRes;
              })
              .catch((e) => {
                isRefreshing = false;
                refreshPromise = null;
                // Обрабатываем ошибку авторизации
                if (!skipAuthError) {
                  handleAuthError(e, undefined, true);
                }
                throw e;
              });
            
            try {
              await refreshPromise;
              // Обновляем заголовки с новым токеном
              const newToken = getAccessToken();
              if (newToken) headers.set('Authorization', `Bearer ${newToken}`);
              // Повторяем запрос
              const retryRes = await doFetch();
              if (!retryRes.ok) {
                if (retryRes.status === 401 && !skipAuthError) {
                  handleAuthError(new Error('Токен истёк'), undefined, true);
                }
                throw await this.toApiError(retryRes);
              }
              return (await this.parseBody<T>(retryRes));
            } catch (e) {
              // Если refresh не удался, пробрасываем ошибку
              throw e;
            }
          } else {
            // Если уже идет refresh, ждем его и повторяем запрос
            try {
              await refreshPromise;
              const newToken = getAccessToken();
              if (newToken) headers.set('Authorization', `Bearer ${newToken}`);
              const retryRes = await doFetch();
              if (!retryRes.ok) {
                if (retryRes.status === 401 && !skipAuthError) {
                  handleAuthError(new Error('Токен истёк'), undefined, true);
                }
                throw await this.toApiError(retryRes);
              }
              return (await this.parseBody<T>(retryRes));
            } catch (e) {
              // Если refresh не удался, пробрасываем ошибку
              throw e;
            }
          }
        }

        // Сохраняем CSRF токен из заголовка ответа (если есть)
        // Сервер отправляет его в заголовке X-CSRF-Token при GET запросах
        const csrfTokenFromHeader = res.headers.get('X-CSRF-Token');
        if (csrfTokenFromHeader) {
          this.csrfToken = csrfTokenFromHeader;
        }

        if (!res.ok) {
          if (res.status >= 500 && res.status < 600 && attempt < retry) {
            await sleep(2 ** attempt * 250);
            attempt++;
            continue;
          }
          
          // Если это 401, но не обработано выше
          if (res.status === 401 && !skipAuthError) {
            handleAuthError(await this.toApiError(res), undefined, true);
          }
          
          throw await this.toApiError(res);
        }

        return (await this.parseBody<T>(res));
      } catch (err) {
        if (attempt < retry) {
          await sleep(2 ** attempt * 250);
          attempt++;
          continue;
        }
        
        // Обрабатываем ошибку авторизации перед пробросом
        if (!skipAuthError) {
          handleAuthError(err, undefined, false); // не редиректим здесь, так как ошибка уже проброшена
        }
        
        throw err;
      }
    }

    // если дошли сюда — все ретраи исчерпаны
    throw new Error('Request failed after retries');
  }

  private async parseBody<T>(res: Response): Promise<T> {
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return (await res.json()) as T;
    return (await res.text()) as unknown as T;
  }

  private async toApiError(res: Response) {
    const msg = (() => {
      try { return res.json(); } catch { return res.text(); }
    })();
    return new Error(`HTTP ${res.status} ${res.statusText} — ${await msg}`);
  }

  get<T>(endpoint: string, opts?: RequestOptions) {
    return this.request<T>(endpoint, { ...opts, method: 'GET' });
  }
  post<T>(endpoint: string, body?: unknown, opts?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...opts,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    });
  }
  put<T>(endpoint: string, body?: unknown, opts?: RequestOptions) {
    return this.request<T>(endpoint, { ...opts, method: 'PUT', body: JSON.stringify(body ?? {}) });
  }
  patch<T>(endpoint: string, body?: unknown, opts?: RequestOptions) {
    return this.request<T>(endpoint, { ...opts, method: 'PATCH', body: JSON.stringify(body ?? {}) });
  }
  delete<T>(endpoint: string, opts?: RequestOptions) {
    return this.request<T>(endpoint, { ...opts, method: 'DELETE' });
  }
}

export const api = new ApiService();


