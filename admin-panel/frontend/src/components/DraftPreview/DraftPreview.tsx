// src/components/Admin/DraftPreview/DraftPreview.tsx
import React from "react";
import styles from "./DraftPreview.module.scss";

interface DraftPreviewProps {
    rawHtml?: string | null;
    description?: string | null;
    image?: string | null;
    button_text?: string | null;
    button_href?: string | null;
}

const DraftPreview: React.FC<DraftPreviewProps> = ({
    rawHtml,
    description,
    image,
    button_text,
    button_href,
}) => {
    // Если есть ненулевой rawHtml — рендерим его целиком
    if (rawHtml && rawHtml.trim()) {
        return (
            <div
                className={styles.rawHtml}
                dangerouslySetInnerHTML={{ __html: rawHtml }}
            />
        );
    }

    // Иначе визуальный шаблон
    return (
        <section className={styles.post}>
            {image && (
                <div className={styles.imageWrapper}>
                    <img src={image} alt="" className={styles.image} />
                </div>
            )}
            {description && (
                <p className={styles.description}>{description}</p>
            )}
            {button_text && button_href && (
                <a href={button_href} className={styles.button}>
                    {button_text}
                </a>
            )}
        </section>
    );
};

export default DraftPreview;
