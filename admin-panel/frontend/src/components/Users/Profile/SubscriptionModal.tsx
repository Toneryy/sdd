import styles from "./Modal.module.scss";

export default function SubscriptionModal({ item, onClose }: any) {
  if (!item) return null;
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeIcon} onClick={onClose}>×</button>
        <h2>Информация о подписке</h2>
        <p>
          <strong>ID:</strong> {item.id}
        </p>
        <p>
          <strong>Название:</strong> {item.subscriptions?.title}
        </p>
        <p>
          <strong>Описание:</strong> {item.subscriptions?.description || "—"}
        </p>
        <p>
          <strong>Срок:</strong> {item.subscriptions?.duration_days} дней
        </p>
        <p>
          <strong>Цена:</strong> {item.subscriptions?.price} ₽
        </p>
        <p>
          <strong>Активна:</strong> {item.active ? "Да" : "Нет"}
        </p>
        <p>
          <strong>Период:</strong> с{" "}
          {new Date(item.start_date).toLocaleDateString()} до{" "}
          {new Date(item.end_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
