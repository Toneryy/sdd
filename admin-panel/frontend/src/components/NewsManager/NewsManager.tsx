import React, { useEffect, useState } from "react";
import { getNews, addNews, updateNews, deleteNews } from "api/news";
import { toast } from "react-toastify";
import NewsList from "./NewsList";
import NewsForm from "./NewsForm";
import styles from "./NewsManager.module.scss";

interface NewsItem {
    id: string;
    title: string;
    description?: string;
    image?: string;
    content?: string;
    published: boolean;
    created_at: string;
    updated_at?: string;
}

const NewsManager: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [editing, setEditing] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const data = await getNews();
            setNews(data);
        } catch {
            toast.error("Не удалось загрузить новости");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleAdd = async (form: Partial<NewsItem>) => {
        try {
            const created = await addNews(form);
            setNews((prev) => [created, ...prev]);
            toast.success("Новость добавлена");
        } catch {
            toast.error("Ошибка при добавлении");
        }
    };

    const handleUpdate = async (id: string, form: Partial<NewsItem>) => {
        try {
            const updated = await updateNews(id, form);
            setNews((prev) => prev.map((n) => (n.id === id ? updated : n)));
            setEditing(null);
            toast.success("Новость обновлена");
        } catch {
            toast.error("Ошибка при обновлении");
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Удалить эту новость?")) return;
        try {
            await deleteNews(id);
            setNews((prev) => prev.filter((n) => n.id !== id));
            toast.success("Новость удалена");
        } catch {
            toast.error("Ошибка при удалении");
        }
    };

    return (
        <div className={styles.manager}>
            <h2 className={styles.title}>Управление новостями</h2>

            <div className={styles.formWrapper}>
                <NewsForm
                    onSubmit={handleAdd}
                    key={editing ? editing.id : "create"}
                    initialData={editing || undefined}
                    onUpdate={editing ? (form) => handleUpdate(editing.id, form) : undefined}
                    onCancel={editing ? () => setEditing(null) : undefined}
                />
            </div>

            <NewsList
                news={news}
                loading={loading}
                onEdit={(item) => setEditing(item)}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default NewsManager;
