import express from "express";
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

import { scheduleSubscriptionRefresh } from "./jobs";
import { authenticateJWT } from "./middleware/auth.middleware";

dotenv.config();

const app = express();
scheduleSubscriptionRefresh();

// Включаем куки и CORS с куками
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

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

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Server running on port ${port}`));
