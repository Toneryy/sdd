import React, { useState, useEffect, useCallback } from "react";
import ModalWrapper from "../../Users/Profile/ModalWrapper";
import styles from "./EditModal.module.scss";
import { usePermissions } from "contexts/PermissionsContext";

type TableName = "products" | "categories" | "subscriptions" | "product_keys";

interface Props {
  show: boolean;
  table: TableName;
  item: any | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditModal: React.FC<Props> = ({ show, table, item, onClose, onSave }) => {
  const { loading, hasAccess } = usePermissions();
  const canEdit = !loading && hasAccess("EDIT_MODAL");

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (!show || !item || !canEdit) return;
    setForm({ ...item });
  }, [show, item, canEdit]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = useCallback(() => {
    if (!canEdit) return;
    onSave(form);
  }, [form, onSave, canEdit]);

  useEffect(() => {
    if (!show || !canEdit) return;

    const typingTags = ["INPUT", "TEXTAREA", "SELECT"];
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSave();
      } else if (
        e.key === "Escape" ||
        (e.key === "Backspace" &&
          !typingTags.includes(
            (document.activeElement as HTMLElement | null)?.tagName || ""
          ))
      ) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [show, handleSave, onClose, canEdit]);

  if (!show || !canEdit) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Редактирование</h2>

        {table === "products" && (
          <>
            <input
              className={styles.input}
              name="name"
              value={form.name || ""}
              onChange={onChange}
              placeholder="Название"
              title="Название товара"
            />
            <input
              className={styles.input}
              name="price"
              value={form.price || ""}
              onChange={onChange}
              placeholder="Цена"
              type="number"
              title="Цена товара"
            />
            <input
              className={styles.input}
              name="description"
              value={form.description || ""}
              onChange={onChange}
              placeholder="Описание"
              title="Описание товара"
            />
            <input
              className={styles.input}
              name="img"
              value={form.img || ""}
              onChange={onChange}
              placeholder="URL картинки"
              title="Ссылка на изображение товара"
            />
          </>
        )}

        {table === "categories" && (
          <input
            className={styles.input}
            name="name"
            value={form.name || ""}
            onChange={onChange}
            placeholder="Название категории"
            title="Название категории"
          />
        )}

        {table === "subscriptions" && (
          <>
            <input
              className={styles.input}
              name="title"
              value={form.title || ""}
              onChange={onChange}
              placeholder="Название"
              title="Название подписки"
            />
            <input
              className={styles.input}
              name="duration_days"
              value={form.duration_days || ""}
              onChange={onChange}
              placeholder="Дней"
              type="number"
              title="Длительность подписки в днях"
            />
            <input
              className={styles.input}
              name="price"
              value={form.price || ""}
              onChange={onChange}
              placeholder="Цена"
              type="number"
              title="Цена подписки"
            />
            <input
              className={styles.input}
              name="description"
              value={form.description || ""}
              onChange={onChange}
              placeholder="Описание"
              title="Описание подписки"
            />
            <input
              className={styles.input}
              name="image"
              value={form.image || ""}
              onChange={onChange}
              placeholder="URL картинки"
              title="Ссылка на изображение подписки"
            />
          </>
        )}

        {table === "product_keys" && (
          <>
            <input
              className={styles.input}
              value={form.keys_aliases?.[0]?.code ?? "—"}
              disabled
              placeholder="Код (псевдокод)"
              title="Публичный код, который вводит пользователь"
            />

            <input
              className={styles.input}
              name="key_encrypted"
              value={form.key_encrypted || ""}
              onChange={onChange}
              placeholder="Ключ (зашифрованный)"
              title="Хеш-ключ, хранимый в базе"
            />

            <select
              className={styles.input}
              name="product_id"
              value={form.product_id || ""}
              onChange={onChange}
              title="Привязанный товар"
            >
              <option value="">Выберите товар</option>
              {form.productsList?.map((p: any) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <label
              className={styles.toggleWrapper}
              title="Отметьте, если ключ уже активирован"
            >
              <input
                type="checkbox"
                checked={form.used || false}
                onChange={(e) =>
                  setForm({ ...form, used: e.target.checked })
                }
                className={styles.toggleCheckbox}
              />
              <span className={styles.toggleSlider}></span>
              <span className={styles.toggleLabel}>Ключ использован</span>
            </label>
          </>
        )}

        <div className={styles.btnRow}>
          <button className={styles.saveBtn} onClick={handleSave}>
            Сохранить
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditModal;
