// src/components/StaffList/StaffList.tsx
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiTrash2, FiEdit2, FiPlus, FiSearch, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";
import { getStaffMembers, deleteStaffMember, Staff } from "../../api/staff";
import EditModal from "./EditModal";
import ModalWrapper from "../Users/Profile/ModalWrapper";
import styles from "./StaffList.module.scss";
import { usePermissions } from "contexts/PermissionsContext";

const ROLE_LABEL: Record<Staff["role"], string> = {
    administrator: "Администратор",
    operator: "Оператор",
};

export default function StaffList() {
    const [list, setList] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<"" | Staff["role"]>("");

    const [editing, setEditing] = useState<Staff | null>(null);
    const [toDelete, setToDelete] = useState<Staff | null>(null);

    // права
    const { loading: permsLoading, hasAccess } = usePermissions();
    const canEdit = !permsLoading && hasAccess("EDIT_MODAL");
    const canDelete = !permsLoading && hasAccess("DELETE_CONFIRMATION");
    const showActionsRow = canEdit || canDelete;

    // загрузка
    useEffect(() => {
        (async () => {
            try {
                const data = await getStaffMembers();
                setList(data);
            } catch (err) {
                console.error(err);
                toast.error("Не удалось загрузить сотрудников");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // поиск/фильтр
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return list.filter((s) => {
            const matchRole = roleFilter ? s.role === roleFilter : true;
            const matchQuery =
                !q ||
                s.username.toLowerCase().includes(q) ||
                s.email.toLowerCase().includes(q);
            return matchRole && matchQuery;
        });
    }, [list, query, roleFilter]);

    // обновление из модалки
    const handleUpdated = (updated: Staff) => {
        setList((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    };

    // удаление
    const confirmDelete = async () => {
        if (!toDelete) return;
        try {
            await deleteStaffMember(toDelete.id);
            setList((prev) => prev.filter((s) => s.id !== toDelete.id));
            toast.success("Сотрудник удалён");
        } catch (e) {
            console.error(e);
            toast.error("Ошибка при удалении");
        } finally {
            setToDelete(null);
        }
    };

    return (
        <div className={styles.container}>
            {/* Header / toolbar */}
            <div className={styles.toolbar}>
                <h1 className={styles.title}>Сотрудники</h1>

                <div className={styles.actions}>
                    <div className={styles.search}>
                        <FiSearch className={styles.searchIcon} />
                        <input
                            placeholder="Поиск по логину или email…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles.roleFilter}>
                        <button
                            className={!roleFilter ? styles.roleBtnActive : styles.roleBtn}
                            onClick={() => setRoleFilter("")}
                        >
                            Все
                        </button>
                        <button
                            className={roleFilter === "administrator" ? styles.roleBtnActive : styles.roleBtn}
                            onClick={() => setRoleFilter("administrator")}
                            title="Администраторы"
                        >
                            <FiShield />
                            Админы
                        </button>
                        <button
                            className={roleFilter === "operator" ? styles.roleBtnActive : styles.roleBtn}
                            onClick={() => setRoleFilter("operator")}
                            title="Операторы"
                        >
                            <FiUser />
                            Операторы
                        </button>
                    </div>
                    
                    {hasAccess("EDIT_MODAL") && ( // +++ показываем только если есть доступ к EditModal
                        <NavLink to="/admin/register" className={styles.addBtn} title="Создать сотрудника">
                            <FiPlus />
                            Новый сотрудник
                        </NavLink>
                    )}
                </div>
            </div>

            {/* State lines */}
            <div className={styles.metaLine}>
                {loading ? "Загрузка…" : `Найдено: ${filtered.length}`}
            </div>

            {/* Grid */}
            {loading ? (
                <div className={styles.grid}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className={`${styles.card} ${styles.skeleton}`} />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className={styles.empty}>
                    Нет сотрудников по текущему фильтру
                </div>
            ) : (
                <div className={styles.grid}>
                    {filtered.map((s) => (
                        <div key={s.id} className={styles.card}>
                            <div className={styles.cardTop}>
                                <FiUser className={styles.avatar} />
                                <span
                                    className={`${styles.roleBadge} ${s.role === "administrator" ? styles.admin : styles.operator
                                        }`}
                                >
                                    {ROLE_LABEL[s.role]}
                                </span>
                            </div>

                            <div className={styles.info}>
                                <div className={styles.username}>{s.username}</div>
                                <div className={styles.email}>{s.email}</div>
                            </div>

                            {/* Кнопки действий — скрываем блок, если оба действия запрещены */}
                            <div
                                className={styles.actionsRow}
                                style={{ display: showActionsRow ? undefined : "none" }}
                            >
                                <button
                                    className={styles.editBtn}
                                    style={{ display: canEdit ? undefined : "none" }}
                                    onClick={() => {
                                        if (!canEdit) return;
                                        setEditing(s);
                                    }}
                                    title="Редактировать"
                                >
                                    <FiEdit2 />
                                    Редактировать
                                </button>

                                <button
                                    className={styles.deleteBtn}
                                    style={{ display: canDelete ? undefined : "none" }}
                                    onClick={() => {
                                        if (!canDelete) return;
                                        setToDelete(s);
                                    }}
                                    title="Удалить"
                                >
                                    <FiTrash2 />
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit modal — не монтируем, если бан на EDIT_MODAL */}
            {canEdit && (
                <EditModal
                    show={editing !== null}
                    staff={editing}
                    onClose={() => setEditing(null)}
                    onUpdated={handleUpdated}
                />
            )}

            {/* Delete confirm — не монтируем, если бан на DELETE_CONFIRMATION */}
            {toDelete && canDelete && (
                <ModalWrapper onClose={() => setToDelete(null)}>
                    <div className={styles.confirm}>
                        <h3>Удалить сотрудника?</h3>
                        <p>
                            Это действие необратимо. Сотрудник{" "}
                            <b>{toDelete.username}</b> будет удалён.
                        </p>
                        <div className={styles.confirmRow}>
                            <button className={styles.cancel} onClick={() => setToDelete(null)}>
                                Отмена
                            </button>
                            <button className={styles.danger} onClick={confirmDelete}>
                                Удалить
                            </button>
                        </div>
                    </div>
                </ModalWrapper>
            )}
        </div>
    );
}
