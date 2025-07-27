// src/components/Users/Profile/modals/ProductModal.tsx
import styles from "../Modal.module.scss";
import ModalWrapper from "../ModalWrapper";

interface Props {
  item: any;
  onClose: () => void;
}

export default function ProductModal({ item, onClose }: Props) {
  if (!item) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <div className={styles.modal}>
        <button className={styles.closeIcon} onClick={onClose}>×</button>

        <h3 className={styles.heading}>Информация о продукте</h3>

        <p className={styles.text}>
          <strong>ID:</strong> {item.id}
        </p>
        <p className={styles.text}>
          <strong>Название:</strong> {item.products?.name}
        </p>
        <p className={styles.text}>
          <strong>Номинал:</strong> {item.products?.denomination}
        </p>
        <p className={styles.text}>
          <strong>Цена:</strong> {item.products?.price} ₽
        </p>
        <p className={styles.text}>
          <strong>Добавлен:</strong>{" "}
          {new Date(item.added_at).toLocaleString()}
        </p>
        <p className={styles.text}>
          <strong>Код:</strong> {item.code || "—"}
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
