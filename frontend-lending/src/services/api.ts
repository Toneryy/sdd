import { API_URL } from '../constants';
import { getAccessToken, refreshTokens } from './token';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions extends RequestInit {
  auth?: boolean;
  retry?: number;
  timeoutMs?: number;
  asJson?: boolean;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class ApiService {
  private baseURL = API_URL;

  async request<T>(
    endpoint: string,
    { auth = true, retry = 2, timeoutMs = 15000, asJson = true, ...init }: RequestOptions = {}
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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const doFetch = async (): Promise<Response> => {
      return fetch(url, { ...init, headers, signal: controller.signal });
    };

    let attempt = 0;

    while (attempt <= retry) {
      try {
        const res = await doFetch();
        clearTimeout(timeout);

        if (res.status === 401 && auth) {
          try {
            await refreshTokens();
            const retryRes = await doFetch();
            if (!retryRes.ok) throw await this.toApiError(retryRes);
            return (await this.parseBody<T>(retryRes));
          } catch (e) {
            throw await this.toApiError(res);
          }
        }

        if (!res.ok) {
          if (res.status >= 500 && res.status < 600 && attempt < retry) {
            await sleep(2 ** attempt * 250);
            attempt++;
            continue;
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
  post<T>(endpoint: string, body?: any, opts?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...opts,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    });
  }
  put<T>(endpoint: string, body?: any, opts?: RequestOptions) {
    return this.request<T>(endpoint, { ...opts, method: 'PUT', body: JSON.stringify(body ?? {}) });
  }
  patch<T>(endpoint: string, body?: any, opts?: RequestOptions) {
    return this.request<T>(endpoint, { ...opts, method: 'PATCH', body: JSON.stringify(body ?? {}) });
  }
  delete<T>(endpoint: string, opts?: RequestOptions) {
    return this.request<T>(endpoint, { ...opts, method: 'DELETE' });
  }
}

export const api = new ApiService();


