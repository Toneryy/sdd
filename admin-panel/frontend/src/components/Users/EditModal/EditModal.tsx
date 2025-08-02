import React, { useEffect, useState, useCallback } from "react";
import ModalWrapper from "../Profile/ModalWrapper"; // путь к обёртке-модалке
import styles from "./EditModal.module.scss";

interface User {
    id: string;
    username: string | null;
    email: string | null;
    phone: string | null;
    lastEndDate: string | null;
}

interface Props {
    show: boolean;
    item: User | null;
    onClose: () => void;
    onSave: (data: Partial<User> & { id: string }) => void;
}

const EditModal: React.FC<Props> = ({ show, item, onClose, onSave }) => {
    /** Локальное состояние формы */
    const [form, setForm] = useState<Partial<User>>({});

    /** Наполняем форму при открытии и очищаем при закрытии */
    useEffect(() => {
        if (show && item) {
            const { lastEndDate, ...editable } = item;
            setForm(editable);
        } else {
            setForm({});
        }
    }, [show, item]);

    /** Закрываем модалку по Esc */
    useEffect(() => {
        if (!show) return; // слушаем только когда модалка открыта

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [show, onClose]);

    /** Контролируемые инпуты */
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setForm(prev => ({ ...prev, [name]: value }));
        },
        [],
    );

    /** Сохранение изменений */
    const handleSave = () => {
        if (!item) return;
        onSave({ ...form, id: item.id });
    };

    /** Если show === false, ничего не рендерим */
    if (!show) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Редактирование</h2>

                <input
                    className={styles.input}
                    name="username"
                    value={form.username ?? ""}
                    onChange={onChange}
                    placeholder="Имя пользователя"
                />
                <input
                    className={styles.input}
                    name="email"
                    value={form.email ?? ""}
                    onChange={onChange}
                    placeholder="Email"
                />
                <input
                    className={styles.input}
                    name="phone"
                    value={form.phone ?? ""}
                    onChange={onChange}
                    placeholder="Телефон"
                />

                <div className={styles.btnRow}>
                    <button className={styles.saveBtn} onClick={handleSave}>
                        Сохранить
                    </button>
                    <button className={styles.cancelBtn} onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default EditModal;
