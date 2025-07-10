import styles from "./Modal.module.scss";

export default function ProductModal({ item, onClose }: any) {
  if (!item) return null;
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeIcon} onClick={onClose}>×</button>
        <h2>Информация о продукте</h2>
        <p>
          <strong>ID:</strong> {item.id}
        </p>
        <p>
          <strong>Название:</strong> {item.products?.name}
        </p>
        <p>
          <strong>Номинал:</strong> {item.products?.denomination}
        </p>
        <p>
          <strong>Цена:</strong> {item.products?.price} ₽
        </p>
        <p>
          <strong>Добавлен:</strong> {new Date(item.added_at).toLocaleString()}
        </p>
        <p>
          <strong>Код:</strong> {item.code || "—"}
        </p>
      </div>
    </div>
  );
}
