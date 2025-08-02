// src/components/Admin/Clients/Clients.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Clients.module.scss";
import { getUsers } from "../../api/users";

interface Client {
    id: string;
    username: string | null;
    email: string | null;
    phone: string | null;
    lastEndDate: string | null;
}

const Clients: React.FC = () => {
    const [allClients, setAllClients] = useState<Client[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [needRenewOnly, setNeedRenewOnly] = useState(false);
    const [sortAsc, setSortAsc] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers()
            .then((data) => {
                // оставляем только тех, у кого была подписка
                const withSubs = data.filter((u: Client) => u.lastEndDate !== null);
                setAllClients(withSubs);
            })
            .catch(console.error);
    }, []);

    // текущее время и неделя в миллисекундах
    const now = useMemo(() => new Date(), []);
    const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

    const displayedClients = useMemo(() => {
        return allClients
            // фильтр по чекбоксу "Нужно продлить"
            .filter((c) => {
                if (!needRenewOnly) return true;
                if (!c.lastEndDate) return false;
                const end = new Date(c.lastEndDate).getTime();
                return end < now.getTime() || end - now.getTime() <= oneWeekMs;
            })
            // фильтр по поисковой строке
            .filter((c) => {
                const q = searchTerm.trim().toLowerCase();
                if (!q) return true;
                return [c.username, c.email, c.phone]
                    .filter(Boolean)
                    .some((v) => v!.toLowerCase().includes(q));
            })
            // сортировка по дате окончания
            .sort((a, b) => {
                const da = a.lastEndDate ? new Date(a.lastEndDate).getTime() : 0;
                const db = b.lastEndDate ? new Date(b.lastEndDate).getTime() : 0;
                return sortAsc ? da - db : db - da;
            });
    }, [allClients, searchTerm, needRenewOnly, sortAsc, now]);

    return (
        <div className={styles.clients}>
            <h1 className={styles.title}>Клиенты</h1>

            {/* Панель управления */}
            <div className={styles.controls}>
                <div className={styles.searchBar}>
                    <input
                        className={styles.searchInput}
                        placeholder="Поиск по клиентам"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && setSearchTerm(e.currentTarget.value)}
                    />
                    <button
                        className={styles.searchButton}
                        onClick={() => {
                            /* поиск срабатывает автоматически через useMemo */
                        }}
                    >
                        Поиск
                    </button>
                </div>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={needRenewOnly}
                        onChange={() => setNeedRenewOnly((v) => !v)}
                    />
                    Нужно продлить
                </label>
            </div>

            {/* Таблица клиентов */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Телефон</th>
                        <th
                            className={styles.sortable}
                            onClick={() => setSortAsc((v) => !v)}
                            title="Сортировка по дате окончания"
                        >
                            Подписка до {sortAsc ? "↑" : "↓"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {displayedClients.map((c) => {
                        const expired = c.lastEndDate !== null && new Date(c.lastEndDate) < now;
                        const formattedDate = c.lastEndDate
                            ? new Date(c.lastEndDate).toLocaleDateString()
                            : "—";
                        return (
                            <tr key={c.id}>
                                <td>
                                    <span
                                        className={styles.link}
                                        onClick={() => navigate(`/admin/users/${c.id}`)}
                                    >
                                        {c.username ?? "—"}
                                    </span>
                                </td>
                                <td>{c.email ?? "—"}</td>
                                <td>{c.phone ?? "—"}</td>
                                <td className={expired ? styles.expired : ""}>{formattedDate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Clients;
