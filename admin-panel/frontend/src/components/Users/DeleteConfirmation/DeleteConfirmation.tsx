// src/components/DeleteConfirmation/DeleteConfirmation.tsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./DeleteConfirmation.module.scss";

interface Props {
    show: boolean;
    onClose: () => void;
    onDelete: () => void;
    title?: string;
    text?: string;
}

const DeleteConfirmation: React.FC<Props> = ({
    show,
    onClose,
    onDelete,
    title = "Удалить пользователя?",
    text = "Это действие нельзя отменить.",
}) => {
    useEffect(() => {
        if (!show) return;
        const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [show, onClose]);

    if (!show) return null;

    return ReactDOM.createPortal(
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.text}>{text}</p>
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
        document.body,
    );
};

export default DeleteConfirmation;
