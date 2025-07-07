import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../../api/categories";
import EditModal from "../EditModal/EditModal";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import styles from "../Products.module.scss";

export default function CategoriesTable() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [name, setName] = useState("");

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    setLoading(true);
    try {
      setRows(await getCategories());
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await addCategory({ name });
      setRows([...rows, created]);
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!currentItemId) return;
    try {
      await deleteCategory(currentItemId);
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
      const saved = await updateCategory(upd.id, { name: upd.name });
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
            placeholder="Название категории"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Добавить
        </button>
      </form>

      <h3 className={styles.subtitle}>3. Содержимое «Категории»</h3>

      {loading ? (
        <p>Загрузка…</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Название</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
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
        table="categories"
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
