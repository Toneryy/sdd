// src/components/Users/Profile.tsx
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";
import axios from "axios";
import { API_URL } from "../../../utils/api";
import ModalWrapper from "./ModalWrapper";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [subs, setSubs] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSub, setSelectedSub] = useState<any | null>(null);
  const [selectedProd, setSelectedProd] = useState<any | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [staffOptions, setStaffOptions] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const [staffId, setStaffId] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/admin/staff-members`)
      .then((res) => setStaffOptions(res.data))
      .catch((err) => console.error("Ошибка загрузки операторов", err));
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/users/${id}`);
        setUser(res.data.user);
        setSubs(res.data.subscriptions ?? []);
        setProducts(res.data.products ?? []);
        setOrders(res.data.serviceOrders ?? []);
      } catch (e) {
        console.error("Ошибка при загрузке профиля", e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedSub) setSelectedSub(null);
        else if (selectedProd) setSelectedProd(null);
        else if (selectedOrder) setSelectedOrder(null);
        else navigate(-1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedSub, selectedProd, selectedOrder, navigate]);

  const handleCopy = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`Значение ${label} скопировано!`);
  };

  const openOrderModal = (o: any) => {
    setSelectedOrder(o);
    setComment(o.operator_description || "");
    setStaffId(o.staff_member_id || "");
  };

  const saveOrder = async () => {
    if (!selectedOrder) return;
    try {
      const res = await axios.put(
        `${API_URL}/admin/orders/${selectedOrder.id}`,
        {
          operator_description: comment,
          operator_id: staffId || null,
        }
      );

      setOrders((prev) =>
        prev.map((o) => (o.id === res.data.id ? res.data : o))
      );
      setSelectedOrder(null);
      toast.success("Обращение обновлено");
    } catch (err) {
      toast.error("Ошибка при обновлении обращения");
      console.error(err);
    }
  };

  if (loading) return <p className={styles.loading}>Загрузка…</p>;
  if (!user) return <p className={styles.error}>Пользователь не найден</p>;

  return (
    <div className={styles.profile}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Назад
      </button>
      <h2 className={styles.heading}>Профиль пользователя</h2>

      <div className={styles.section}>
        <h3 className={styles.subheading}>Основная информация</h3>
        <p
          className={styles.copyable}
          onClick={() => handleCopy("ID", user.id)}
        >
          <strong>ID:</strong> {user.id}
        </p>
        <p
          className={styles.copyable}
          onClick={() => handleCopy("Имя", user.username || "")}
        >
          <strong>Имя:</strong> {user.username || "—"}
        </p>
        <p
          className={styles.copyable}
          onClick={() => handleCopy("Email", user.email || "")}
        >
          <strong>Email:</strong> {user.email || "—"}
        </p>
        <p
          className={styles.copyable}
          onClick={() => handleCopy("Телефон", user.phone || "")}
        >
          <strong>Телефон:</strong> {user.phone || "—"}
        </p>
        <p>
          <strong>Создан:</strong> {new Date(user.created_at).toLocaleString()}
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.subheading}>Подписки</h3>
        {subs.length === 0 ? (
          <p>Нет активных подписок</p>
        ) : (
          <ul className={styles.subList}>
            {subs.map((s) => (
              <li
                key={s.id}
                className={styles.subItem}
                onClick={() => setSelectedSub(s)}
              >
                {s.subscriptions?.title || "—"} — с{" "}
                {new Date(s.start_date).toLocaleDateString()} до{" "}
                {new Date(s.end_date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.subheading}>Сервисные обращения</h3>
        {orders.length === 0 ? (
          <p>Нет обращений</p>
        ) : (
          <ul className={styles.subList}>
            {orders.map((o) => (
              <li
                key={o.id}
                className={styles.subItem}
                onClick={() => openOrderModal(o)}
              >
                {o.service_desc} — {new Date(o.created_at).toLocaleDateString()}{" "}
                — <strong>{o.status || "—"}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <h3 className={styles.subheading}>Продукты</h3>
        {products.length === 0 ? (
          <p>Нет приобретённых продуктов</p>
        ) : (
          <ul className={styles.subList}>
            {products.map((p) => (
              <li
                key={p.id}
                className={styles.subItem}
                onClick={() => setSelectedProd(p)}
              >
                {p.products?.name || "—"} — добавлен{" "}
                {new Date(p.added_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedSub && (
        <ModalWrapper onClose={() => setSelectedSub(null)}>
          <>
            <h3>Информация о подписке</h3>
            <p>
              <strong>Название:</strong> {selectedSub.subscriptions?.title}
            </p>
            <p>
              <strong>Описание:</strong>{" "}
              {selectedSub.subscriptions?.description || "—"}
            </p>
            <p>
              <strong>Цена:</strong> {selectedSub.subscriptions?.price}
            </p>
            <p>
              <strong>Срок:</strong> {selectedSub.subscriptions?.duration_days}{" "}
              дней
            </p>
            <p>
              <strong>Начало:</strong>{" "}
              {new Date(selectedSub.start_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Окончание:</strong>{" "}
              {new Date(selectedSub.end_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Активна:</strong> {selectedSub.active ? "Да" : "Нет"}
            </p>
          </>
        </ModalWrapper>
      )}

      {selectedProd && (
        <ModalWrapper onClose={() => setSelectedProd(null)}>
          <>
            <h3>Информация о продукте</h3>
            <p>
              <strong>Название:</strong> {selectedProd.products?.name}
            </p>
            <p>
              <strong>Номинал:</strong>{" "}
              {selectedProd.products?.denomination || "—"}
            </p>
            <p>
              <strong>Описание:</strong>{" "}
              {selectedProd.products?.description || "—"}
            </p>
            <p>
              <strong>Код:</strong> {selectedProd.code || "—"}
            </p>
            <p>
              <strong>Дата покупки:</strong>{" "}
              {new Date(selectedProd.added_at).toLocaleDateString()}
            </p>
          </>
        </ModalWrapper>
      )}

      {selectedOrder && (
        <ModalWrapper onClose={() => setSelectedOrder(null)}>
          <div className={styles.modalContent}>
            <h3>Редактирование обращения</h3>

            <p>
              <strong>Описание:</strong> {selectedOrder.service_desc}
            </p>
            <p>
              <strong>Статус:</strong> {selectedOrder.status}
            </p>

            <div className={styles.field}>
              <label>Комментарий оператора:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>

            <div className={styles.field}>
              <label>Оператор:</label>
              <select
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
              >
                <option value="">—</option>
                {staffOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.full_name || s.username || s.email}
                  </option>
                ))}
              </select>
            </div>

            <button className={styles.saveBtn} onClick={saveOrder}>
              Сохранить
            </button>
          </div>
        </ModalWrapper>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
      />
    </div>
  );
}
