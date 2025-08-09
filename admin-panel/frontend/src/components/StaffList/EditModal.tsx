// src/components/StaffList/EditModal.tsx
import React, { useEffect, useState, useCallback } from "react";
import ModalWrapper from "../Users/Profile/ModalWrapper";
import { toast } from "react-toastify";
import { updateStaffMember, Staff } from "../../api/staff";
import styles from "./EditModal.module.scss";

interface Props {
    show: boolean;
    staff: Staff | null;
    onClose: () => void;
    onUpdated: (updated: Staff) => void;
}

export default function EditModal({ show, staff, onClose, onUpdated }: Props) {
    const [form, setForm] = useState<{
        username: string;
        email: string;
        role: Staff["role"];
    }>({ username: "", email: "", role: "operator" });

    const [changePassword, setChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [saving, setSaving] = useState(false);

    // заполнение формы при открытии
    useEffect(() => {
        if (show && staff) {
            setForm({
                username: staff.username,
                email: staff.email,
                role: staff.role,
            });
            setChangePassword(false);
            setNewPassword("");
            setConfirm("");
        }
    }, [show, staff]);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSave = useCallback(async () => {
        if (!staff) return;

        // валидация пароля, если включили блок
        let passwordToSend: string | undefined = undefined;
        if (changePassword) {
            if (!newPassword.trim()) {
                toast.error("Введите новый пароль");
                return;
            }
            if (newPassword.length < 6) {
                toast.error("Пароль должен быть не короче 6 символов");
                return;
            }
            if (newPassword !== confirm) {
                toast.error("Пароли не совпадают");
                return;
            }
            passwordToSend = newPassword;
        }

        setSaving(true);
        try {
            const updated = await updateStaffMember(staff.id, {
                username: form.username.trim(),
                email: form.email.trim(),
                role: form.role,
                ...(passwordToSend ? { password: passwordToSend } : {}),
            });
            toast.success("Данные сотрудника обновлены");
            onUpdated(updated);
            onClose();
        } catch (e) {
            console.error(e);
            toast.error("Ошибка при сохранении");
        } finally {
            setSaving(false);
        }
    }, [staff, form, changePassword, newPassword, confirm, onUpdated, onClose]);

    // хоткеи
    useEffect(() => {
        if (!show) return;
        const handler = (e: KeyboardEvent) => {
            const tag = (document.activeElement as HTMLElement)?.tagName;
            const typing = tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA";
            if (e.key === "Enter") {
                e.preventDefault();
                handleSave();
            } else if (e.key === "Escape" || (!typing && e.key === "Backspace")) {
                e.preventDefault();
                onClose();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [show, handleSave, onClose]);

    if (!show || !staff) return null;

    return (
        <ModalWrapper onClose={onClose}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Редактирование сотрудника</h2>

                <label className={styles.label}>Логин</label>
                <input
                    className={styles.input}
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    placeholder="Логин"
                    autoFocus
                />

                <label className={styles.label}>E-mail</label>
                <input
                    className={styles.input}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Email"
                />

                <label className={styles.label}>Роль</label>
                <select
                    className={styles.input}
                    name="role"
                    value={form.role}
                    onChange={onChange}
                >
                    <option value="administrator">Администратор</option>
                    <option value="operator">Оператор</option>
                </select>

                <div className={styles.divider} />

                <label className={styles.checkboxRow}>
                    <input
                        type="checkbox"
                        checked={changePassword}
                        onChange={(e) => setChangePassword(e.target.checked)}
                    />
                    <span>Сменить пароль</span>
                </label>

                {changePassword && (
                    <div className={styles.passwordBlock}>
                        <label className={styles.label}>Новый пароль</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Новый пароль"
                        />

                        <label className={styles.label}>Подтверждение</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="Повторите пароль"
                        />
                    </div>
                )}

                <div className={styles.btnRow}>
                    <button
                        className={styles.saveBtn}
                        onClick={handleSave}
                        type="button"
                        disabled={saving}
                    >
                        {saving ? "Сохраняем…" : "Сохранить"}
                    </button>
                    <button className={styles.cancelBtn} onClick={onClose} type="button">
                        Отмена
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
}
