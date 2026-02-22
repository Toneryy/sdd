# Admin Panel Backend - Setup Guide

## Установка зависимостей

```bash
cd admin-panel/backend
npm install
```

Установятся:
- `express-rate-limit` - защита от DDoS и брутфорса
- `joi` - валидация данных
- `@types/express-rate-limit` - типы для TypeScript

## Настройка переменных окружения

1. Скопируй `.env.example` в `.env`:
```bash
cp .env.example .env
```

2. Заполни обязательные переменные:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key-minimum-32-characters"
CRYPTO_SECRET="your-encryption-key-exactly-32-chars"
```

**⚠️ ВАЖНО:** `CRYPTO_SECRET` должен совпадать с `ENCRYPTION_KEY` в `backend-lending/.env`!

## Что добавлено

### 1. Rate Limiting
- **Общий лимит**: 100 запросов за 15 минут на `/api/*`
- **Авторизация**: 5 попыток за 15 минут на `/api/auth/login` и `/api/auth/register`
- **Создание пользователей**: 10 созданий за час

### 2. Валидация запросов
- Все входящие данные проверяются с помощью Joi
- Автоматическая валидация для:
  - Login/Register
  - Создание/обновление пользователей
  - Query параметры (page, limit, search)
  - URL параметры (ID с проверкой UUID)

### 3. Обработка ошибок
- Глобальный error handler для всех необработанных ошибок
- 404 handler для несуществующих роутов
- Graceful shutdown при SIGTERM/SIGINT
- Подробное логирование ошибок

### 4. Health Check
- Эндпоинт `/health` для мониторинга статуса сервера

## Примеры использования

### Тест rate limiting
```bash
# Попробуй сделать > 5 запросов за 15 минут
curl -X POST http://localhost:4001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "123456"}'
```

### Тест валидации
```bash
# Невалидный email
curl -X POST http://localhost:4001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "email": "invalid", "password": "123456"}'

# Ответ:
{
  "message": "Ошибка валидации",
  "errors": [
    {
      "field": "email",
      "message": "Некорректный email"
    }
  ]
}
```

### Health check
```bash
curl http://localhost:4001/health

# Ответ:
{
  "status": "ok",
  "timestamp": "2025-01-15T12:00:00.000Z",
  "environment": "development"
}
```

## Запуск

```bash
npm start
```

Должен увидеть:
```
✅ Server running on port 4001
📝 Environment: development
```

## Что дальше

Следующие улучшения:
- Логирование с winston/pino
- Кеширование для часто запрашиваемых данных
- Helmet для безопасности headers
- Мониторинг производительности

