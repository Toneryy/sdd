import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./DeleteConfirmation.module.scss";

interface Props {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmation: React.FC<Props> = ({ show, onClose, onDelete }) => {
  useEffect(() => {
    if (!show) return;

    const typingTags = ["INPUT", "TEXTAREA", "SELECT"];
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onDelete();
      } else if (
        e.key === "Escape" ||
        (e.key === "Backspace" &&
          !typingTags.includes(
            (document.activeElement as HTMLElement | null)?.tagName || ""
          ))
      ) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [show, onClose, onDelete]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Удалить запись?</h2>
        <p className={styles.text}>
          Это действие можно отменить только вручную.
        </p>
        <div className={styles.btnRow}>
          <button className={styles.deleteBtn} onClick={onDelete}>
            Удалить
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteConfirmation;
