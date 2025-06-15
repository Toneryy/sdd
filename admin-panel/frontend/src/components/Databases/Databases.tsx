// src/components/Databases/Databases.tsx

import React, { useEffect, useState } from 'react';
import { getDbNameAliases, updateDbNameAlias } from '../../api/dbNameAliases'; // Импортируем API
import styles from './Databases.module.scss';

interface DbNameAlias {
    id: string;
    table_name: string;
    alias_name: string;
    description?: string; // Убираем null, оставляем только string или undefined
}

const Databases: React.FC = () => {
    const [dbAliases, setDbAliases] = useState<DbNameAlias[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedDbAlias, setEditedDbAlias] = useState<DbNameAlias | null>(null);

    useEffect(() => {
        // Получаем данные с API
        getDbNameAliases()
            .then((data) => setDbAliases(data))
            .catch((error) => console.error('Ошибка при получении данных:', error));
    }, []);

    const startEdit = (db: DbNameAlias) => {
        setIsEditing(true);
        setEditedDbAlias(db);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditedDbAlias(null);
    };

    const saveEdit = () => {
        if (!editedDbAlias) return;

        updateDbNameAlias(editedDbAlias.id, {
            alias_name: editedDbAlias.alias_name,
            description: editedDbAlias.description ?? '', // Заменяем null на пустую строку
        })
            .then(() => {
                setDbAliases((prev) =>
                    prev.map((item) =>
                        item.id === editedDbAlias.id ? editedDbAlias : item
                    )
                );
                setIsEditing(false);
                setEditedDbAlias(null);
            })
            .catch((error) => console.error('Ошибка при сохранении данных:', error));
    };

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editedDbAlias) return;
        setEditedDbAlias({ ...editedDbAlias, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Базы данных</h2>

            {!isEditing && (
                <ul className={styles.dbList}>
                    {dbAliases.map((alias) => (
                        <li key={alias.id} className={styles.dbItem}>
                            <div className={styles.dbDetails}>
                                <h3 className={styles.dbAlias}>{alias.alias_name}</h3>
                                <p className={styles.dbTableName}>{alias.table_name}</p>
                            </div>
                            <button
                                className={styles.editBtn}
                                onClick={() => startEdit(alias)}
                            >
                                Редактировать
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {isEditing && editedDbAlias && (
                <div className={styles.editForm}>
                    <h3 className={styles.formTitle}>Редактирование базы данных</h3>

                    <label htmlFor="alias_name" className={styles.label}>
                        Отображаемое название
                    </label>
                    <input
                        id="alias_name"
                        name="alias_name"
                        value={editedDbAlias.alias_name}
                        onChange={onFieldChange}
                        className={styles.inputField}
                    />

                    <label htmlFor="description" className={styles.label}>
                        Описание
                    </label>
                    <input
                        id="description"
                        name="description"
                        value={editedDbAlias.description ?? ''}
                        onChange={onFieldChange}
                        className={styles.inputField}
                    />

                    <div className={styles.buttonGroup}>
                        <button className={styles.saveBtn} onClick={saveEdit}>
                            Сохранить
                        </button>
                        <button className={styles.cancelBtn} onClick={cancelEdit}>
                            Отменить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Databases;
