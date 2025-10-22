import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import subscriptionRoutes from "./routes/subscriptions.routes";
import shopRoutes from "./routes/shop.routes";
import purchaseRoutes from "./routes/purchase.routes";
import promoRoutes from "./routes/promoRoutes";
import postsRoutes from "./routes/posts.routes";
import publicNewsRoutes from "./routes/publicNews.routes";

import { generalLimiter } from "./middlewares/rateLimit";
import { startSchedulers } from "./jobs";

dotenv.config();

// Проверка обязательных переменных окружения
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'ENCRYPTION_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('📝 Please create .env file based on .env.example');
  process.exit(1);
}

// Проверка длины ключей
if (process.env.ENCRYPTION_KEY && process.env.ENCRYPTION_KEY.length < 32) {
  console.warn('⚠️  ENCRYPTION_KEY should be at least 32 characters long');
}

if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
  console.warn('⚠️  JWT_SECRET should be at least 32 characters long');
}

const app = express();

app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
app.use("/api", generalLimiter);

app.use("/api/news", publicNewsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/promocodes", promoRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/purchase", purchaseRoutes);

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

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// старт крона
startSchedulers();

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
