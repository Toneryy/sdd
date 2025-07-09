import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getProductKeys,
  addProductKey,
  updateProductKey,
  deleteProductKey,
} from "../../../api/productKeys";
import { getProducts } from "../../../api/products";
import EditModal from "../EditModal/EditModal";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import styles from "../Products.module.scss";

export default function ProductKeysTable() {
  const [allRows, setAllRows] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const blank = { key_encrypted: "", product_id: "", code: "" };
  const [form, setForm] = useState(blank);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(rows.length / pageSize);
  const paginatedRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    fetchRows();
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const fetchRows = async () => {
    setLoading(true);
    try {
      const data = await getProductKeys();
      setAllRows(data);
      setRows(data);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProductKey(form);
      await fetchRows();
      setForm(blank);
      toast.success("Ключ добавлен");
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при добавлении ключа");
    }
  };

  const handleDelete = async () => {
    if (!currentItemId) return;
    try {
      await deleteProductKey(currentItemId);
      setRows((prev) => prev.filter((r) => r.id !== currentItemId));
      toast.info("Ключ удалён");
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при удалении");
    } finally {
      setDeleteModalVisible(false);
      setCurrentItemId(null);
    }
  };

  const handleSaveEdit = async (upd: any) => {
    try {
      const { id, key_encrypted, product_id, used } = upd;
      const saved = await updateProductKey(id, {
        key_encrypted,
        product_id,
        used,
      });

      setRows((prev) => prev.map((r) => (r.id === saved.id ? saved : r)));
      toast.success("Сохранено");
      setEditModalVisible(false);
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при сохранении");
    }
  };

  const handleSearch = () => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) {
      setRows(allRows);
      setCurrentPage(1);
      return;
    }

    const filtered = allRows.filter((r) =>
      [r.key_encrypted, r.keys_aliases?.[0]?.code, r.products?.name]
        .filter(Boolean)
        .some((v) => v.toString().toLowerCase().includes(q))
    );

    setRows(filtered);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setSearchTerm(v);
    if (!v.trim()) {
      setRows(allRows);
      setCurrentPage(1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (toast.length < 3) {
        toast.info("Скопировано", { autoClose: 2000 });
      }
    } catch (err) {
      toast.error("Не удалось скопировать");
    }
  };

  const currentItem = rows.find((r) => r.id === currentItemId) ?? null;

  return (
    <>
      <h3 className={styles.subtitle}>2. Добавить ключ</h3>

      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Поиск по ключам / кодам / товарам"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Поиск
        </button>
      </div>

      <form onSubmit={handleAdd} className={styles.form}>
        <div className={styles.formField}>
          <input
            name="key_encrypted"
            placeholder="Ключ"
            value={form.key_encrypted}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.formField}>
          <select
            name="product_id"
            value={form.product_id}
            onChange={onChange}
            required
          >
            <option value="">Выберите товар</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          Добавить
        </button>
      </form>

      <h3 className={styles.subtitle}>3. Список ключей</h3>

      {loading ? (
        <p>Загрузка…</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ключ</th>
                <th>Код</th>
                <th>Товар</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((r) => (
                <tr key={r.id}>
                  <td
                    title={r.key_encrypted}
                    style={{ cursor: "pointer" }}
                    onClick={() => copyToClipboard(r.key_encrypted)}
                  >
                    {r.key_encrypted.slice(0, 6)}…{r.key_encrypted.slice(-4)}
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (r.keys_aliases?.[0]?.code)
                        copyToClipboard(r.keys_aliases[0].code);
                    }}
                  >
                    {r.keys_aliases?.[0]?.code ?? "—"}
                  </td>
                  <td>{r.products?.name ?? "—"}</td>
                  <td>{r.used ? "Использован" : "Свободен"}</td>
                  <td>
                    <button
                      className={styles.editButton}
                      onClick={() => {
                        setCurrentItemId(r.id);
                        setEditModalVisible(true);
                      }}
                    >
                      ✎
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => {
                        setCurrentItemId(r.id);
                        setDeleteModalVisible(true);
                      }}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                ←
              </button>
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={page === currentPage ? styles.activePage : ""}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                →
              </button>
            </div>
          )}
        </>
      )}

      <EditModal
        show={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        table="product_keys"
        item={currentItem ? { ...currentItem, productsList: products } : null}
        onSave={handleSaveEdit}
      />
      <DeleteConfirmation
        show={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
