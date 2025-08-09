// src/components/Products/Products.tsx
import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import ProductsTable from "./Tables/ProductsTable";
import CategoriesTable from "./Tables/CategoriesTable";
import SubscriptionsTable from "./Tables/SubscriptionsTable";
import ProductKeysTable from "./Tables/ProductKeysTable";
import { getDbNameAliases, type DbNameAlias } from "../../api/dbNameAliases";

// Разрешённые разделы (и сразу тип из них)
const ALLOWED_TABLES = ["products", "categories", "subscriptions", "product_keys"] as const;
type TableName = typeof ALLOWED_TABLES[number];

export default function Products() {
  const [aliases, setAliases] = useState<Array<Pick<DbNameAlias, "table_name" | "alias_name">>>([]);
  const [table, setTable] = useState<TableName | "">("");

  useEffect(() => {
    getDbNameAliases()
      .then((data) =>
        setAliases(
          data.filter((a) => (ALLOWED_TABLES as readonly string[]).includes(a.table_name))
        )
      )
      .catch(console.error);
  }, []);

  return (
    <div className={styles.productEditor}>
      <h1 className={styles.title}>Админ-редактор</h1>

      <div className={styles.tableSelector}>
        <h3 className={styles.subtitle}>1. Выберите раздел</h3>
        {aliases.map((a) => (
          <button
            key={a.table_name}
            className={table === a.table_name ? styles.activeButton : styles.selectBtn}
            onClick={() => setTable(a.table_name as TableName)}
          >
            {a.alias_name}
          </button>
        ))}
      </div>

      {table === "products" && <ProductsTable />}
      {table === "categories" && <CategoriesTable />}
      {table === "subscriptions" && <SubscriptionsTable />}
      {table === "product_keys" && <ProductKeysTable />}
    </div>
  );
}
