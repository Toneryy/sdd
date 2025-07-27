// src/components/Users/Profile/Profile.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Profile.module.scss";
import { useProfileData } from "./hooks";

/* ------ секции ------ */
import UserInfo from "./sections/UserInfo";
import Subscriptions from "./sections/Subscriptions";
import Products from "./sections/Products";
import SupportRequests from "./sections/SupportRequests";

/* ------ модалки ------ */
import ProductModal from "./modals/ProductModal";
import SubscriptionModal from "./modals/UserSubscriptionModal";
import SupportRequestModal from "./modals/SupportRequestModal";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    user,
    subs,
    products,
    requests,
    staff,
    loading,
    updateRequest,
  } = useProfileData(id);

  /* какая модалка открыта */
  const [product, setProduct] = useState<any | null>(null);
  const [subscription, setSubscription] = useState<any | null>(null);
  const [request, setRequest] = useState<any | null>(null);

  /* глобальный toast для copy‑event */
  useEffect(() => {
    const onCopyToast = (e: Event) =>
      toast.success((e as CustomEvent).detail);
    document.addEventListener("copy-toast", onCopyToast);
    return () => document.removeEventListener("copy-toast", onCopyToast);
  }, []);

  /* ESC закрывает модалку или страницу */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (product) setProduct(null);
      else if (subscription) setSubscription(null);
      else if (request) setRequest(null);
      else navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, subscription, request, navigate]);

  if (loading) return <p className={styles.loading}>Загрузка…</p>;
  if (!user) return <p className={styles.error}>Пользователь не найден</p>;

  return (
    <div className={styles.profile}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Назад
      </button>
      <h2 className={styles.heading}>Профиль пользователя</h2>

      <UserInfo user={user} />
      <Subscriptions items={subs} onSelect={setSubscription} />
      <SupportRequests items={requests} onSelect={setRequest} />
      <Products items={products} onSelect={setProduct} />

      {/* ---- модалки ---- */}
      {product && (
        <ProductModal
          item={product}
          onClose={() => setProduct(null)}
        />
      )}

      {subscription && (
        <SubscriptionModal
          item={subscription}
          onClose={() => setSubscription(null)}
        />
      )}

      {request && (
        <SupportRequestModal
          item={request}
          staffOptions={staff}
          onClose={() => setRequest(null)}
          onSave={async (payload) => {
            try {
              await updateRequest(payload, request.id);
              setRequest(null);
              toast.success("Обращение обновлено");
            } catch {
              toast.error("Ошибка при обновлении обращения");
            }
          }}
        />
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
      />
    </div>
  );
}
