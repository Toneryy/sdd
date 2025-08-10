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
import { usePermissions } from "contexts/PermissionsContext";

export default function ProductsTable() {
  const { loading: pLoading, hasAccess } = usePermissions();
  const canEdit = !pLoading && hasAccess("EDIT_MODAL");
  const canDelete = !pLoading && hasAccess("DELETE_CONFIRMATION");

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

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(rows.length / pageSize);
  const paginatedRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
    fetchRows();
  }, []);

  const fetchRows = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
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
      await addProduct({
        name: form.name,
        price: form.price,
        description: form.description,
        img: form.img,
        category_id: form.category_id || null,
      });
      await fetchRows();
      setForm(blank);
      toast.success("Товар добавлен");
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при добавлении товара");
    }
  };

  const handleDelete = async () => {
    if (!currentItemId) return;
    try {
      await deleteProduct(currentItemId);
      await fetchRows();
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
      await updateProduct(upd.id, upd);
      await fetchRows();
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
        <>
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
              {paginatedRows.map((r) => (
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
                    {canEdit && (
                      <button
                        className={`${styles.editButton} ${!canEdit ? 'permHidden' : ''}`}
                        onClick={() => {
                          setCurrentItemId(r.id);
                          setEditModalVisible(true);
                        }}
                        title="Редактировать"
                      >
                        ✎
                      </button>
                    )}
                    {canDelete && (
                      <button
                        className={`${styles.deleteButton} ${!canDelete ? 'permHidden' : ''}`}
                        onClick={() => {
                          setCurrentItemId(r.id);
                          setDeleteModalVisible(true);
                        }}
                        title="Удалить"
                      >
                        ✕
                      </button>
                    )}
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
        show={canEdit && editModalVisible}
        onClose={() => setEditModalVisible(false)}
        table="products"
        item={currentItem}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmation
        show={canDelete && deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
