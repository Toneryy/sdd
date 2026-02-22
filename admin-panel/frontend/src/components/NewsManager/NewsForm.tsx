import { useState, useEffect } from "react";
import styles from "./NewsManager.module.scss";

interface NewsFormProps {
  onSubmit: (form: any) => void;
  onUpdate?: (form: any) => void;
  onCancel?: () => void;
  initialData?: any;
}

const NewsForm: React.FC<NewsFormProps> = ({
  onSubmit,
  onUpdate,
  onCancel,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [published, setPublished] = useState(false);
  const [rawHtml, setRawHtml] = useState("");
  const [rawCss, setRawCss] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setImage(initialData.image || "");
      setPublished(initialData.published ?? false);
      setRawHtml(initialData.content || "");
      setRawCss(initialData.styles || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      image,
      published,
      content: rawHtml,
      styles: rawCss,
    };

    if (onUpdate) {
      onUpdate(payload);
    } else {
      onSubmit(payload);
    }

    if (!onUpdate) {
      setTitle("");
      setDescription("");
      setImage("");
      setPublished(false);
      setRawHtml("");
      setRawCss("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className={styles.textarea}
        placeholder="Краткое описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Ссылка на изображение"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <label className={styles.label}>Полный текст (HTML)</label>
      <textarea
        className={styles.codearea}
        placeholder="<h2>Заголовок</h2><p>Ваш текст...</p>"
        value={rawHtml}
        onChange={(e) => setRawHtml(e.target.value)}
      />

      <label className={styles.label}>Стили (CSS)</label>
      <textarea
        className={styles.codearea}
        placeholder="p { font-size: 16px; }"
        value={rawCss}
        onChange={(e) => setRawCss(e.target.value)}
      />

      <div className={styles.previewWrapper}>
        <h3>Превью</h3>
        <div className={styles.previewCard}>
          <style>{rawCss}</style>
          <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
        </div>
      </div>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Опубликовано
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.button}>
          {onUpdate ? "Сохранить" : "Добавить"}
        </button>
        {onCancel && (
          <button
            type="button"
            className={styles.buttonSecondary}
            onClick={onCancel}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};

export default NewsForm;
