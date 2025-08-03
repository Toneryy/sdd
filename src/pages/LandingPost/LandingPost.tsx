// src/components/LandingPost/LandingPost.tsx
import React, { useState, useEffect } from "react";
import { getPost, Post } from "../../api/posts";
import styles from "./LandingPost.module.scss";

const LandingPost: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPost()
            .then((data) => {
                // если пустой объект — поста нет
                if ((data as Post).id) {
                    setPost(data as Post);
                } else {
                    setPost(null);
                }
            })
            .catch((err) => {
                console.error("Не удалось загрузить пост:", err);
                setPost(null);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className={styles.loading}>Загрузка…</div>;
    if (!post) return null; // ничего не выводим, если пост не создан

    // если есть raw_html — отрисуем его целиком
    if (post.raw_html) {
        return (
            <div
                className={styles.rawHtml}
                dangerouslySetInnerHTML={{ __html: post.raw_html }}
            />
        );
    }

    // иначе собираем шаблон из полей
    return (
        <section className={styles.post}>
            {post.image && (
                <div className={styles.imageWrapper}>
                    <img src={post.image} alt="" className={styles.image} />
                </div>
            )}
            {post.description && (
                <p className={styles.description}>{post.description}</p>
            )}
            {post.button_text && post.button_href && (
                <a href={post.button_href} className={styles.button}>
                    {post.button_text}
                </a>
            )}
        </section>
    );
};

export default LandingPost;
