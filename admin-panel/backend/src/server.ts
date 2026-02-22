import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import staffMembersRoutes from "./routes/staffMembers.routes";

import staffRightsRoutes from "./routes/staffRights.routes";
import dbNameAliasesRoutes from "./routes/dbNameAliases.routes";
import productsRoutes from "./routes/products.routes";
import categoriesRoutes from "./routes/categories.routes";
import subscriptionsRoutes from "./routes/subscriptions.routes";
import usersRoutes from "./routes/users.routes";
import keysAliasesRoutes from "./routes/keys_aliases.routes";
import productKeysRoutes from "./routes/product_keys.routes";
import keyLookupRoutes from "./routes/key_lookup.routes";
import supportRequestsRouter from "./routes/supportRequests.routes";
import postsRoutes from "./routes/posts.routes";
import newsRoutes from "./routes/news.routes"

import { scheduleSubscriptionRefresh } from "./jobs";
import { authenticateJWT } from "./middleware/auth.middleware";
import { apiLimiter } from "./middleware/rateLimit";

dotenv.config();

// Проверка обязательных переменных окружения
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'CRYPTO_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('📝 Please create .env file based on .env.example');
  process.exit(1);
}

// Проверка длины ключей
if (process.env.CRYPTO_SECRET && process.env.CRYPTO_SECRET.length < 32) {
  console.warn('⚠️  CRYPTO_SECRET should be at least 32 characters long');
}

if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
  console.warn('⚠️  JWT_SECRET should be at least 32 characters long');
}

const app = express();
scheduleSubscriptionRefresh();

// Включаем куки и CORS с куками
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Rate limiting для всех API запросов
app.use("/api/", apiLimiter);

// 1) Публичные ручки — БЕЗ авторизации
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

// 2) Общая «auth wall» для всего остального API
app.use("/api", (req, res, next) => {
  // allowlist публичных путей внутри /api
  const PUBLIC = [/^\/auth(\/|$)/, /^\/posts(\/|$)/];
  if (PUBLIC.some((rx) => rx.test(req.path))) return next();
  return authenticateJWT(req, res, next); // если не в allowlist — требуем JWT
});

// Остальные как есть (постепенно будем закрывать авторизацией)
app.use("/api/staff-members", staffMembersRoutes);
app.use("/api/staff-rights", staffRightsRoutes);
app.use("/api/admin/staff-members", staffMembersRoutes); // алиас, если нужен
app.use("/api/db-name-aliases", dbNameAliasesRoutes);
app.use("/api/admin/products", productsRoutes);
app.use("/api/admin/categories", categoriesRoutes);
app.use("/api/admin/subscriptions", subscriptionsRoutes);
app.use("/api/admin/support-requests", supportRequestsRouter);
app.use("/api/admin/users", usersRoutes);
app.use("/api/admin/keys-aliases", keysAliasesRoutes);
app.use("/api/admin/product-keys", productKeysRoutes);
app.use("/api/admin/key-lookup", keyLookupRoutes);
app.use("/api/admin/posts", postsRoutes);
app.use("/api/admin/news", newsRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// 404 Handler - должен быть перед error handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    message: "Route not found",
    path: req.path 
  });
});

// Global Error Handler - должен быть последним middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[ERROR]', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // В production не показываем stack trace
  const isDev = process.env.NODE_ENV !== 'production';
  
  res.status(500).json({
    message: isDev ? err.message : 'Internal server error',
    ...(isDev && { stack: err.stack })
  });
});

const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
