// src/components/Admin/PostEditor/PostEditor.tsx
import React, { useState, useEffect } from "react";
import {
    getAdminPost,        // ⚠ импортируйте именно админ-метод
    upsertPost,
    deletePost,
    Post,
} from "../../api/posts";
import styles from "./PostEditor.module.scss";
import { toast } from "react-toastify";

const PostEditor: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [rawMode, setRawMode] = useState(false);
    const [postId, setPostId] = useState<string | null>(null);

    const [rawHtml, setRawHtml] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [buttonHref, setButtonHref] = useState("");

    /* ---------- загрузка поста ---------- */
    useEffect(() => {
        getAdminPost()
            .then((data) => {
                if ((data as Post).id) {
                    const p = data as Post;
                    setPostId(p.id);
                    setRawHtml(p.raw_html ?? "");
                    setDescription(p.description ?? "");
                    setImage(p.image ?? "");
                    setButtonText(p.button_text ?? "");
                    setButtonHref(p.button_href ?? "");
                }
            })
            .catch((err) => console.error("Не удалось загрузить пост:", err))
            .finally(() => setLoading(false));
    }, []);

    /* ---------- handlers ---------- */
    const handleSave = async () => {
        try {
            await upsertPost({
                id: postId ?? undefined,
                raw_html: rawMode ? rawHtml || null : null,
                description: rawMode ? null : description || null,
                image: rawMode ? null : image || null,
                button_text: rawMode ? null : buttonText || null,
                button_href: rawMode ? null : buttonHref || null,
            });
            toast.success("Пост сохранён ✅");
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при сохранении 😔");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Точно удалить текущий пост?")) return;
        try {
            await deletePost();
            setPostId(null);
            setRawHtml("");
            setDescription("");
            setImage("");
            setButtonText("");
            setButtonHref("");
            toast.success("Пост удалён 🗑️");
        } catch (err) {
            toast.error("Ошибка при удалении");
        }
    };

    if (loading) return <div>Загрузка…</div>;

    return (
        <div className={styles.editor}>
            <h1 className={styles.title}>Редактор главного поста</h1>

            {/* переключатель режима */}
            <div className={styles.toggle}>
                <label>
                    <input
                        type="radio"
                        checked={!rawMode}
                        onChange={() => setRawMode(false)}
                    />{" "}
                    Визуальный
                </label>
                <label>
                    <input
                        type="radio"
                        checked={rawMode}
                        onChange={() => setRawMode(true)}
                    />{" "}
                    Raw HTML
                </label>
            </div>

            {/* формы */}
            {!rawMode ? (
                <div className={styles.form}>
                    <label>
                        Описание:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        URL картинки:
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </label>
                    <label>
                        Текст кнопки:
                        <input
                            type="text"
                            value={buttonText}
                            onChange={(e) => setButtonText(e.target.value)}
                        />
                    </label>
                    <label>
                        Ссылка кнопки:
                        <input
                            type="text"
                            value={buttonHref}
                            onChange={(e) => setButtonHref(e.target.value)}
                        />
                    </label>
                </div>
            ) : (
                <div className={styles.form}>
                    <label>
                        Raw HTML:
                        <textarea
                            className={styles.raw}
                            value={rawHtml}
                            onChange={(e) => setRawHtml(e.target.value)}
                        />
                    </label>
                </div>
            )}

            {/* действия */}
            <div className={styles.actions}>
                <button className={styles.save} onClick={handleSave}>
                    Сохранить
                </button>
                {postId && (
                    <button className={styles.delete} onClick={handleDelete}>
                        Удалить
                    </button>
                )}
            </div>
        </div>
    );
};

export default PostEditor;
