import React from "react";
import { Link } from "react-router-dom";
import styles from "./NewsPage.module.scss";

interface NewsCardProps {
    news: {
        id: string;
        title: string;
        description?: string;
        image?: string;
        created_at: string;
    };
}

// функция truncate
const truncate = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
};

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    return (
        <Link to={`/news/${news.id}`} className={styles.newsCard}>
            {news.image && (
                <img src={news.image} alt={news.title} className={styles.newsImage} />
            )}
            <div className={styles.newsContent}>
                <h2 className={styles.newsTitle}>{news.title}</h2>
                {news.description && (
                    <p className={styles.newsDesc}>{truncate(news.description, 120)}</p>
                )}
                <span className={styles.newsDate}>
                    {new Date(news.created_at).toLocaleDateString("ru-RU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
            </div>
        </Link>
    );
};

export default NewsCard;
