// src/components/Register/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { toast } from "react-toastify";
import { addStaffMember } from "../../api/staff";

type Role = "administrator" | "operator";

type FormData = {
    username: string;
    email: string;
    role: Role;
    password: string;
    confirmPassword: string;
};

const ROLES: { value: Role; label: string }[] = [
    { value: "administrator", label: "Администратор" },
    { value: "operator", label: "Оператор" },
];

export default function Register() {
    const [form, setForm] = useState<FormData>({
        username: "",
        email: "",
        role: "operator",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const navigate = useNavigate();

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErr(null);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        if (form.password !== form.confirmPassword) {
            setErr("Пароли не совпадают");
            return;
        }

        setLoading(true);
        try {
            await addStaffMember({
                username: form.username.trim(),
                email: form.email.trim(),
                role: form.role,
                password: form.password,
            });
            toast.success("Сотрудник создан");
            navigate("/admin/staff-members", { replace: true });
        } catch (e: any) {
            const msg =
                e?.response?.data?.message ||
                e?.message ||
                "Не удалось зарегистрировать сотрудника";
            setErr(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h1 className={styles.title}>Новый сотрудник</h1>
                {err && <div className={styles.error}>{err}</div>}

                <form onSubmit={onSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="username" className={styles.label}>Логин</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className={styles.input}
                            value={form.username}
                            onChange={onChange}
                            required
                            disabled={loading}
                            autoComplete="username"
                            autoFocus
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email" className={styles.label}>E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={styles.input}
                            value={form.email}
                            onChange={onChange}
                            required
                            disabled={loading}
                            autoComplete="email"
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="role" className={styles.label}>Роль</label>
                        <select
                            id="role"
                            name="role"
                            className={styles.select}
                            value={form.role}
                            onChange={onChange}
                            disabled={loading}
                        >
                            {ROLES.map(r => (
                                <option key={r.value} value={r.value}>{r.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="password" className={styles.label}>Пароль</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={styles.input}
                            value={form.password}
                            onChange={onChange}
                            required
                            disabled={loading}
                            autoComplete="new-password"
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="confirmPassword" className={styles.label}>Подтверждение</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className={styles.input}
                            value={form.confirmPassword}
                            onChange={onChange}
                            required
                            disabled={loading}
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? "Создаём…" : "Зарегистрировать"}
                    </button>
                </form>
            </div>
        </div>
    );
}
