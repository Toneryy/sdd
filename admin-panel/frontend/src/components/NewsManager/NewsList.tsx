import React from "react";
import styles from "./NewsManager.module.scss";

interface NewsItem {
    id: string;
    title: string;
    description?: string;
    image?: string;
    published: boolean;
    created_at: string;
}

interface Props {
    news: NewsItem[];
    loading: boolean;
    onEdit: (item: NewsItem) => void;
    onDelete: (id: string) => void;
}

const NewsList: React.FC<Props> = ({ news, loading, onEdit, onDelete }) => {
    if (loading) return <p className={styles.loading}>Загрузка...</p>;
    if (news.length === 0) return <p className={styles.empty}>Нет новостей</p>;

    return (
        <div className={styles.list}>
            {news.map((item) => (
                <div key={item.id} className={styles.card}>
                    {item.image && (
                        <img src={item.image} alt={item.title} className={styles.cardImage} />
                    )}
                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{item.title}</h3>
                        <p className={styles.cardDescription}>{item.description}</p>
                        <div className={styles.meta}>
                            <span className={styles.date}>
                                {new Date(item.created_at).toLocaleDateString()}
                            </span>
                            <span
                                className={`${styles.badge} ${item.published ? styles.published : styles.draft
                                    }`}
                            >
                                {item.published ? "Опубликовано" : "Черновик"}
                            </span>
                        </div>
                        <div className={styles.cardActions}>
                            <button
                                className={styles.button}
                                onClick={() => onEdit(item)}
                            >
                                Редактировать
                            </button>
                            <button
                                className={styles.buttonDanger}
                                onClick={() => onDelete(item.id)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsList;
