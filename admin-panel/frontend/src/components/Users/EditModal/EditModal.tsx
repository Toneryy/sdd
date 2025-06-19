import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './EditModal.module.scss';

interface Props {
    show: boolean;
    item: User | null;
    onClose: () => void;
    onSave: (data: Partial<User> & { id: string }) => void;
}

/** Плоское описание пользователя в UI */
interface User {
    id: string;
    username: string | null;
    email: string | null;
    phone: string | null;
    lastEndDate: string | null;   // только для отображения, на сохранение не отправляем
}

const EditModal: React.FC<Props> = ({ show, item, onClose, onSave }) => {
    const [form, setForm] = useState<Partial<User>>({});

    /* копируем данные выбранной строки */
    useEffect(() => {
        if (show && item) {
            const { lastEndDate, ...editable } = item;   // не редактируем дату подписки
            setForm(editable);
        }
    }, [show, item]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = () => {
        if (!item) return;
        onSave({ ...form, id: item.id });
    };

    if (!show) return null;

    return ReactDOM.createPortal(
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>Редактирование</h2>

                <input
                    className={styles.input}
                    name="username"
                    value={form.username ?? ''}
                    onChange={onChange}
                    placeholder="Имя пользователя"
                />
                <input
                    className={styles.input}
                    name="email"
                    value={form.email ?? ''}
                    onChange={onChange}
                    placeholder="Email"
                />
                <input
                    className={styles.input}
                    name="phone"
                    value={form.phone ?? ''}
                    onChange={onChange}
                    placeholder="Телефон"
                />

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
        document.body,
    );
};

export default EditModal;
