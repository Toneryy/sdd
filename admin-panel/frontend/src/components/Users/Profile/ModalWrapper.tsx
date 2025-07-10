// src/components/Users/ModalWrapper.tsx
import styles from "./Modal.module.scss";

export default function ModalWrapper({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeIcon} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
