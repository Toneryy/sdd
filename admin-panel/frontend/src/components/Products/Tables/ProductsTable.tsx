import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../api/products";
import { getCategories } from "../../../api/categories";
import EditModal from "../EditModal/EditModal";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import styles from "../Products.module.scss";

export default function ProductsTable() {
  const [categories, setCategories] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const blank = {
    name: "",
    price: "",
    description: "",
    img: "",
    category_id: "",
  };
  const [form, setForm] = useState(blank);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
    fetchRows();
  }, []);

  const fetchRows = async () => {
    setLoading(true);
    try {
      setRows(await getProducts());
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
      const created = await addProduct({
        name: form.name,
        price: form.price,
        description: form.description,
        img: form.img,
        category_id: form.category_id || null,
      });
      setRows([...rows, created]);
      setForm(blank);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!currentItemId) return;
    try {
      await deleteProduct(currentItemId);
      setRows((prev) => prev.filter((r) => r.id !== currentItemId));
      toast.info("Запись удалена");
    } catch (err) {
      console.error(err);
      toast.error("Не удалось удалить запись");
    } finally {
      setDeleteModalVisible(false);
      setCurrentItemId(null);
    }
  };

  const handleSaveEdit = async (upd: any) => {
    try {
      const saved = await updateProduct(upd.id, upd);
      setRows((prev) => prev.map((r) => (r.id === saved.id ? saved : r)));
      toast.success("Изменения сохранены");
      setEditModalVisible(false);
    } catch (err) {
      console.error(err);
      toast.error("Не удалось сохранить изменения");
    }
  };

  const currentItem = rows.find((r) => r.id === currentItemId) ?? null;

  return (
    <>
      <h3 className={styles.subtitle}>2. Добавить запись</h3>

      <form onSubmit={handleAdd} className={styles.form}>
        <div className={styles.formField}>
          <input
            name="name"
            placeholder="Название"
            value={form.name}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.formField}>
          <input
            name="price"
            type="number"
            placeholder="Цена"
            value={form.price}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.formField}>
          <input
            name="description"
            placeholder="Описание"
            value={form.description}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.formField}>
          <input
            name="img"
            placeholder="URL картинки"
            value={form.img}
            onChange={onChange}
          />
        </div>
        <div className={styles.formField}>
          <select
            name="category_id"
            value={form.category_id}
            onChange={onChange}
            required
          >
            <option value="">Категория</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          Добавить
        </button>
      </form>

      <h3 className={styles.subtitle}>3. Содержимое «Товары»</h3>

      {loading ? (
        <p>Загрузка…</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена</th>
              <th>Категория</th>
              <th>Фотография</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.price}</td>
                <td>{r.categories?.name ?? "—"}</td>
                <td>
                  {r.img ? (
                    <img
                      src={r.img}
                      alt="img"
                      className={styles.imgPreview}
                      width={40}
                    />
                  ) : (
                    "—"
                  )}
                </td>
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
      )}

      <EditModal
        show={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        table="products"
        item={currentItem}
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
