import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import staffMembersRoutes from "./routes/staffMembers.routes";
import staffRightsRoutes from "./routes/staffRights.routes";
import dbNameAliasesRoutes from "./routes/dbNameAliases.routes";
import productsRoutes from "./routes/products.routes";
import categoriesRoutes from "./routes/categories.routes";
import subscriptionsRoutes from "./routes/subscriptions.routes";
import usersRoutes from "./routes/users.routes";
import keysAliasesRoutes from "./routes/keys_aliases.routes";
import productKeysRoutes from './routes/product_keys.routes'
import keyLookupRoutes from "./routes/key_lookup.routes";
import { scheduleSubscriptionRefresh } from './jobs';

dotenv.config();

const app = express();
scheduleSubscriptionRefresh();

app.use(cors()); // Для обработки CORS запросов
app.use(express.json()); // Для парсинга JSON

// Подключаем маршруты
app.use("/api/staff-members", staffMembersRoutes);
app.use("/api/staff-rights", staffRightsRoutes);
app.use("/api/db-name-aliases", dbNameAliasesRoutes);
app.use("/api/admin/products", productsRoutes);
app.use("/api/admin/categories", categoriesRoutes); // Новый маршрут для категорий
app.use("/api/admin/subscriptions", subscriptionsRoutes); // Новый маршрут для подписок
app.use("/api/admin/users", usersRoutes);
app.use("/api/admin/keys-aliases", keysAliasesRoutes);
app.use('/api/admin/product-keys', productKeysRoutes)
app.use("/api/admin/key-lookup", keyLookupRoutes);

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
