import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById } from "../../api/publicNews";
import { News } from "../../types";
import styles from "./NewsPage.module.scss";

// Тип перенесён в src/types

const NewsDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNewsById(id!);
                setNews(data);
            } catch (err) {
                console.error("Ошибка загрузки новости", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [id]);

    if (loading) return <div className={styles.loading}>Загрузка...</div>;
    if (!news) return <div className={styles.empty}>Новость не найдена</div>;

    // примерное время чтения (200 слов в минуту)
    const wordCount = news.content
        ? news.content.replace(/<[^>]+>/g, "").trim().split(/\s+/).length
        : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 100));

    return (
        <div className={styles.newsDetail}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                ← Назад
            </button>

            <h1 className={styles.detailTitle}>{news.title}</h1>
            <div className={styles.detailMeta}>
                <span className={styles.detailDate}>
                    {new Date(news.created_at).toLocaleDateString("ru-RU")}
                </span>
                <span className={styles.detailReadingTime}>
                    ⏱ {readingTime} мин. на чтение
                </span>
            </div>

            {news.image && (
                <img src={news.image} alt={news.title} className={styles.detailImage} loading="lazy" />
            )}

            {news.description && (
                <p className={styles.detailDescription}>{news.description}</p>
            )}

            <div
                className={styles.detailContent}
                dangerouslySetInnerHTML={{ __html: news.content || "" }}
            />
        </div>
    );
};

export default NewsDetail;
