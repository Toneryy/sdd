import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
} from "../../../api/subscriptions";
import EditModal from "../EditModal/EditModal";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import styles from "../Products.module.scss";
import { usePermissions } from "contexts/PermissionsContext";

export default function SubscriptionsTable() {
  const { loading: pLoading, hasAccess } = usePermissions();
  const canEdit = !pLoading && hasAccess("EDIT_MODAL");
  const canDelete = !pLoading && hasAccess("DELETE_CONFIRMATION");

  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const blank = {
    title: "",
    duration_days: "",
    price: "",
    description: "",
    image: "",
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
    fetchRows();
  }, []);

  const fetchRows = async () => {
    setLoading(true);
    try {
      const data = await getSubscriptions();
      setRows(data);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSubscription({
        title: form.title,
        duration_days: Number(form.duration_days),
        price: form.price,
        description: form.description,
        image: form.image,
      });
      await fetchRows();
      setForm(blank);
      toast.success("Подписка добавлена");
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при добавлении подписки");
    }
  };

  const handleDelete = async () => {
    if (!currentItemId) return;
    try {
      await deleteSubscription(currentItemId);
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
      await updateSubscription(upd.id, {
        title: upd.title,
        duration_days: upd.duration_days,
        price: upd.price,
        description: upd.description,
        image: upd.image,
      });
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
            name="title"
            placeholder="Название подписки"
            value={form.title}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.formField}>
          <input
            name="duration_days"
            type="number"
            placeholder="Длительность (дни)"
            value={form.duration_days}
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
          />
        </div>
        <div className={styles.formField}>
          <input
            name="image"
            placeholder="URL изображения"
            value={form.image}
            onChange={onChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Добавить
        </button>
      </form>

      <h3 className={styles.subtitle}>3. Содержимое «Подписки»</h3>

      {loading ? (
        <p>Загрузка…</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Название</th>
                <th>Дней</th>
                <th>Цена</th>
                <th>Фотография</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((r) => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td>{r.duration_days}</td>
                  <td>{r.price}</td>
                  <td>
                    {r.image ? (
                      <img
                        src={r.image}
                        alt="sub"
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
        table="subscriptions"
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
