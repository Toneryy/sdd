import rateLimit from 'express-rate-limit';

// Общий лимит для всех API запросов
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // 100 запросов с одного IP за 15 минут
  message: {
    message: 'Слишком много запросов с вашего IP, попробуйте позже',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Строгий лимит для авторизации (защита от брутфорса)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5, // 5 попыток за 15 минут
  skipSuccessfulRequests: true, // Не считаем успешные запросы
  message: {
    message: 'Слишком много попыток входа, попробуйте через 15 минут',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Лимит для создания пользователей
export const createUserLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  max: 10, // 10 созданий за час
  message: {
    message: 'Превышен лимит создания пользователей',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

