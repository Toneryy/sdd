// src/components/Admin/EditModal/EditModal.tsx
import React, { useEffect, useState, useCallback } from "react";
import ModalWrapper from "../Profile/ModalWrapper";
import styles from "./EditModal.module.scss";

interface User {
    id: string;
    username: string | null;
    email: string | null;
    phone: string | null;
    lastEndDate: string | null;
}

interface FormState extends Partial<User> {
    password?: string; // ← добавили
}

interface Props {
    show: boolean;
    item: User | null;
    onClose: () => void;
    onSave: (data: (Partial<User> & { id: string }) | (Partial<User> & { id: string; password: string })) => void;
}

const EditModal: React.FC<Props> = ({ show, item, onClose, onSave }) => {
    const [form, setForm] = useState<FormState>({});

    /* наполняем форму при открытии */
    useEffect(() => {
        if (show && item) {
            const { lastEndDate, ...editable } = item;
            setForm({ ...editable, password: "" });
        } else {
            setForm({});
        }
    }, [show, item]);

    /* Esc — закрыть */
    useEffect(() => {
        if (!show) return;
        const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [show, onClose]);

    /* контролируемые инпуты */
    const onChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    /* сохранить */
    const handleSave = () => {
        if (!item) return;

        const { password, ...rest } = form;
        const payload =
            password && password.trim()
                ? { ...rest, password: password.trim(), id: item.id }
                : { ...rest, id: item.id };

        onSave(payload);
    };

    if (!show) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Редактирование пользователя</h2>

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
                <input
                    className={styles.input}
                    type="password"
                    name="password"
                    value={form.password ?? ""}
                    onChange={onChange}
                    placeholder="Новый пароль (не менять — оставьте пустым)"
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
