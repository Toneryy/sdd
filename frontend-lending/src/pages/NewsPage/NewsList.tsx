import React, { useEffect, useState } from "react";
import { getNews } from "../../api/publicNews";
import { News } from "../../types";
import NewsCard from "./NewsCard";
import styles from "./NewsPage.module.scss";
import Skeleton from "../../Components/Skeleton/Skeleton";

// Тип перенесён в src/types

const ITEMS_PER_PAGE = 5;

const NewsList: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews();
                setNews(data.filter((n: News) => n.published));
            } catch (err) {
                console.error("Ошибка загрузки новостей", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading)
        return (
            <div className={styles.newsList}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={styles.newsCard}>
                        <Skeleton width={320} height={180} />
                        <div className={styles.newsContent}>
                            <Skeleton width={240} height={24} />
                            <Skeleton width={280} height={16} />
                            <Skeleton width={180} height={14} />
                        </div>
                    </div>
                ))}
            </div>
        );
    if (!news.length) return <div className={styles.empty}>Нет опубликованных новостей</div>;

    // пагинация
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedNews = news.slice(start, end);
    const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);

    return (
        <div>
            <div className={styles.newsList}>
                {paginatedNews.map((n) => (
                    <NewsCard key={n.id} news={n} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className={styles.pageButton}
                    >
                        ← Предыдущая
                    </button>
                    <span className={styles.pageInfo}>
                        Стр. {page} из {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className={styles.pageButton}
                    >
                        Следующая →
                    </button>
                </div>
            )}
        </div>
    );
};

export default NewsList;
