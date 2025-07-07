import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Products.module.scss";
import { API_URL } from "../../utils/api";
import ProductsTable from "./Tables/ProductsTable";
import CategoriesTable from "./Tables/CategoriesTable";
import SubscriptionsTable from "./Tables/SubscriptionsTable";
import ProductKeysTable from "./Tables/ProductKeysTable";

type TableName =
  | "products"
  | "categories"
  | "subscriptions"
  | "product_keys"
  | "";

export default function Products() {
  const [aliases, setAliases] = useState<
    { table_name: TableName; alias_name: string }[]
  >([]);
  const [table, setTable] = useState<TableName>("");

  useEffect(() => {
    axios
      .get(`${API_URL}/db-name-aliases`)
      .then(({ data }) =>
        setAliases(
          data.filter((a: any) =>
            [
              "products",
              "categories",
              "subscriptions",
              "product_keys",
            ].includes(a.table_name)
          )
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
            className={
              table === a.table_name ? styles.activeButton : styles.selectBtn
            }
            onClick={() => setTable(a.table_name)}
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
