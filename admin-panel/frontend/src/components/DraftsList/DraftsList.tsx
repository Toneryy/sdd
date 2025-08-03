// src/components/Admin/DraftsList/DraftsList.tsx
import React, { useState, useEffect } from "react";
import {
    getDrafts,
    createDraft,
    updateDraft,
    deleteDraft,
    Draft,
} from "../../api/posts";
import DeleteConfirmation from "../Users/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import styles from "./DraftsList.module.scss";

const emptyDraft: Partial<Draft> = {
    raw_html: "",
    description: "",
    image: "",
    button_text: "",
    button_href: "",
};

const DraftsList: React.FC = () => {
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [current, setCurrent] = useState<Partial<Draft>>(emptyDraft);
    const [confirmId, setConfirmId] = useState<string | null>(null); // ← модалка

    /* ---------- загрузка списка ---------- */
    const fetchDrafts = async () => {
        setLoading(true);
        try {
            setDrafts(await getDrafts());
        } catch (err) {
            console.error(err);
            toast.error("Не удалось загрузить черновики");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrafts();
    }, []);

    /* ---------- helpers ---------- */
    const sanitize = (v?: string | null) =>
        (v ?? "").replace(/^[\s\t]+|[\s\t]+$/g, "");

    /* ---------- CRUD ---------- */
    const save = async () => {
        try {
            const payload = {
                raw_html: sanitize(current.raw_html),
                description: sanitize(current.description),
                image: sanitize(current.image),
                button_text: sanitize(current.button_text),
                button_href: sanitize(current.button_href),
            };

            if (current.id) {
                await updateDraft(current.id, payload);
                toast.success("Черновик обновлён");
            } else {
                await createDraft(payload);
                toast.success("Черновик создан");
            }

            setEditing(false);
            setCurrent({ ...emptyDraft });
            fetchDrafts();
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при сохранении");
        }
    };

    const handleDelete = async () => {
        if (!confirmId) return;
        try {
            await deleteDraft(confirmId);
            toast.success("Черновик удалён");
            fetchDrafts();
        } catch (err) {
            console.error(err);
            toast.error("Не удалось удалить");
        } finally {
            setConfirmId(null); // закрываем модалку
        }
    };

    /* ---------- UI ---------- */
    if (loading) return <div className={styles.loading}>Загрузка черновиков…</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Черновики</h1>

            {/* ───────── панель / форма ───────── */}
            {!editing ? (
                <div className={styles.toolbar}>
                    <button className={styles.newBtn} onClick={() => setEditing(true)}>
                        Создать новый
                    </button>
                </div>
            ) : (
                <div className={styles.form}>
                    <h2 className={styles.formTitle}>
                        {current.id ? "Редактировать черновик" : "Новый черновик"}
                    </h2>

                    <div className={styles.toggle}>
                        <label>
                            <input
                                type="radio"
                                checked={!Boolean(current.raw_html)}
                                onChange={() => setCurrent((c) => ({ ...c, raw_html: "" }))}
                            />{" "}
                            Визуальный
                        </label>
                        <label>
                            <input
                                type="radio"
                                checked={Boolean(current.raw_html)}
                                onChange={() =>
                                    setCurrent((c) => ({ ...c, raw_html: c.raw_html ?? "" }))
                                }
                            />{" "}
                            Raw HTML
                        </label>
                    </div>

                    {/* визуальный режим */}
                    {current.raw_html === "" ? (
                        <div className={styles.fields}>
                            <label>
                                <span>Описание:</span>
                                <textarea
                                    value={current.description ?? ""}
                                    onChange={(e) =>
                                        setCurrent((c) => ({ ...c, description: e.target.value }))
                                    }
                                />
                            </label>
                            <label>
                                <span>URL картинки:</span>
                                <input
                                    type="text"
                                    value={current.image ?? ""}
                                    onChange={(e) =>
                                        setCurrent((c) => ({ ...c, image: e.target.value }))
                                    }
                                />
                            </label>
                            <label>
                                <span>Текст кнопки:</span>
                                <input
                                    type="text"
                                    value={current.button_text ?? ""}
                                    onChange={(e) =>
                                        setCurrent((c) => ({ ...c, button_text: e.target.value }))
                                    }
                                />
                            </label>
                            <label>
                                <span>Ссылка кнопки:</span>
                                <input
                                    type="text"
                                    value={current.button_href ?? ""}
                                    onChange={(e) =>
                                        setCurrent((c) => ({ ...c, button_href: e.target.value }))
                                    }
                                />
                            </label>
                        </div>
                    ) : (
                        /* rawHTML режим */
                        <label className={styles.rawLabel}>
                            <span>Raw HTML:</span>
                            <textarea
                                className={styles.raw}
                                value={current.raw_html ?? ""}
                                onChange={(e) =>
                                    setCurrent((c) => ({ ...c, raw_html: e.target.value }))
                                }
                            />
                        </label>
                    )}

                    <div className={styles.actions}>
                        <button className={styles.save} onClick={save}>
                            Сохранить
                        </button>
                        <button
                            className={styles.cancel}
                            onClick={() => {
                                setEditing(false);
                                setCurrent({ ...emptyDraft });
                            }}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            )}

            {/* ───────── таблица черновиков ───────── */}
            {!editing && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Описание</th>
                            <th>Обновлено</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drafts.map((d) => (
                            <tr key={d.id}>
                                <td>
                                    {d.description ? `${d.description.slice(0, 50)}…` : "Raw HTML"}
                                </td>
                                <td>{new Date(d.updatedAt).toLocaleString()}</td>
                                <td>
                                    <button
                                        className={styles.editBtn}
                                        onClick={() => {
                                            setCurrent(d);
                                            setEditing(true);
                                        }}
                                    >
                                        Ред.
                                    </button>
                                    <button
                                        className={styles.delBtn}
                                        onClick={() => setConfirmId(d.id)}
                                    >
                                        Уд.
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* ───────── модалка подтверждения ───────── */}
            <DeleteConfirmation
                show={Boolean(confirmId)}
                onClose={() => setConfirmId(null)}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default DraftsList;
