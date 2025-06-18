import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './EditModal.module.scss';

type TableName = 'products' | 'categories' | 'subscriptions';

interface Props {
    show: boolean;
    table: TableName;
    item: any | null;               // приходит из Products
    onClose: () => void;
    onSave: (data: any) => void;
}

const EditModal: React.FC<Props> = ({ show, table, item, onClose, onSave }) => {
    /* локальная копия полей — редактируем здесь */
    const [form, setForm] = useState<any>({});

    /* когда открылась модалка — копируем данные выбранной строки */
    useEffect(() => {
        if (show && item) setForm({ ...item });
    }, [show, item]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = () => onSave(form);

    /* рендерим в portal, чтобы перекрывать всё приложение */
    if (!show) return null;
    return ReactDOM.createPortal(
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Редактирование</h2>

                {/* ---- поля для products ---- */}
                {table === 'products' && (
                    <>
                        <input
                            className={styles.input}
                            name="name"
                            value={form.name || ''}
                            onChange={onChange}
                            placeholder="Название"
                        />
                        <input
                            className={styles.input}
                            name="price"
                            value={form.price || ''}
                            onChange={onChange}
                            placeholder="Цена"
                            type="number"
                        />
                        <input
                            className={styles.input}
                            name="description"
                            value={form.description || ''}
                            onChange={onChange}
                            placeholder="Описание"
                        />
                        <input
                            className={styles.input}
                            name="img"
                            value={form.img || ''}
                            onChange={onChange}
                            placeholder="URL картинки"
                        />
                    </>
                )}

                {/* ---- поля для categories ---- */}
                {table === 'categories' && (
                    <>
                        <input
                            className={styles.input}
                            name="name"
                            value={form.name || ''}
                            onChange={onChange}
                            placeholder="Название категории"
                        />
                    </>
                )}

                {/* ---- поля для subscriptions ---- */}
                {table === 'subscriptions' && (
                    <>
                        <input
                            className={styles.input}
                            name="title"
                            value={form.title || ''}
                            onChange={onChange}
                            placeholder="Название"
                        />
                        <input
                            className={styles.input}
                            name="duration_days"
                            value={form.duration_days || ''}
                            onChange={onChange}
                            placeholder="Дней"
                            type="number"
                        />
                        <input
                            className={styles.input}
                            name="price"
                            value={form.price || ''}
                            onChange={onChange}
                            placeholder="Цена"
                            type="number"
                        />
                        <input
                            className={styles.input}
                            name="description"
                            value={form.description || ''}
                            onChange={onChange}
                            placeholder="Описание"
                        />
                        <input
                            className={styles.input}
                            name="image"
                            value={form.image || ''}
                            onChange={onChange}
                            placeholder="URL картинки"
                        />
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
        </div>,
        document.body
    );
};

export default EditModal;
