import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

/**
 * CSRF Protection Middleware
 * 
 * Для REST API с JWT токенами в заголовках CSRF защита обычно не критична,
 * так как токены не отправляются автоматически браузером.
 * Но если нужна дополнительная защита - используем этот middleware.
 */

const CSRF_TOKEN_COOKIE_NAME = 'csrf-token';
const CSRF_TOKEN_HEADER_NAME = 'x-csrf-token';

// Хранилище токенов в памяти (в production лучше использовать Redis)
const csrfTokens = new Map<string, { token: string; expires: number }>();

// Очистка истекших токенов каждые 5 минут
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of csrfTokens.entries()) {
    if (value.expires < now) {
      csrfTokens.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Генерация CSRF токена
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Middleware для установки CSRF токена в куку
 * Вызывается при GET запросах для установки токена
 */
export function setCsrfToken(req: Request, res: Response, next: NextFunction): void {
  // Только для GET запросов устанавливаем токен
  if (req.method === 'GET') {
    const token = generateCsrfToken();
    // Преобразуем header в строку (может быть string | string[] | undefined)
    const sessionIdHeader = req.headers['x-session-id'];
    const sessionId = Array.isArray(sessionIdHeader) 
      ? sessionIdHeader[0] 
      : (sessionIdHeader || req.ip || 'default');
    
    // Сохраняем токен в памяти с временем жизни 1 час
    csrfTokens.set(sessionId, {
      token,
      expires: Date.now() + 60 * 60 * 1000
    });

    // Устанавливаем токен в куку с правильными флагами безопасности
    res.cookie(CSRF_TOKEN_COOKIE_NAME, token, {
      httpOnly: true, // ⚠️ ВАЖНО: недоступен из JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS в production
      sameSite: 'strict', // Защита от CSRF
      maxAge: 60 * 60 * 1000, // 1 час
      path: '/'
    });

    // Также отправляем токен в заголовке ответа для frontend
    // Frontend будет использовать его для отправки в заголовке X-CSRF-Token
    res.setHeader('X-CSRF-Token', token);
  }
  next();
}

/**
 * Middleware для проверки CSRF токена
 * Используется для POST, PUT, PATCH, DELETE запросов
 */
export function verifyCsrfToken(req: Request, res: Response, next: NextFunction): void {
  // Пропускаем GET, HEAD, OPTIONS запросы
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Пропускаем публичные эндпоинты (login, register и т.д.)
  const publicPaths = ['/api/auth/login', '/api/auth/register', '/api/auth/refresh'];
  if (publicPaths.some(path => req.path.startsWith(path))) {
    return next();
  }

  // Проверяем наличие cookies (может быть undefined если cookie-parser не подключен)
  const cookies = req.cookies || {};
  const cookieToken = cookies[CSRF_TOKEN_COOKIE_NAME];
  const headerTokenHeader = req.headers[CSRF_TOKEN_HEADER_NAME];
  const headerToken = Array.isArray(headerTokenHeader) 
    ? headerTokenHeader[0] 
    : (headerTokenHeader as string | undefined);
  
  // Преобразуем sessionId header в строку
  const sessionIdHeader = req.headers['x-session-id'];
  const sessionId = Array.isArray(sessionIdHeader) 
    ? sessionIdHeader[0] 
    : (sessionIdHeader || req.ip || 'default');

  // Проверяем наличие токенов
  if (!cookieToken || !headerToken) {
    res.status(403).json({ 
      message: 'CSRF token missing',
      error: 'CSRF_TOKEN_MISSING'
    });
    return;
  }

  // Проверяем совпадение токенов
  if (cookieToken !== headerToken) {
    res.status(403).json({ 
      message: 'Invalid CSRF token',
      error: 'CSRF_TOKEN_INVALID'
    });
    return;
  }

  // Проверяем токен в хранилище (опционально, для дополнительной защиты)
  const storedToken = csrfTokens.get(sessionId);
  if (storedToken && storedToken.token !== cookieToken) {
    res.status(403).json({ 
      message: 'CSRF token mismatch',
      error: 'CSRF_TOKEN_MISMATCH'
    });
    return;
  }

  next();
}

