import React, { useEffect, useState, ChangeEvent } from "react";
import {
    getDbNameAliases,
    updateDbNameAlias,
    type DbNameAlias,
} from "../../api/dbNameAliases";
import styles from "./Databases.module.scss";

const Databases: React.FC = () => {
    const [dbAliases, setDbAliases] = useState<DbNameAlias[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDbAlias, setEditedDbAlias] = useState<DbNameAlias | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getDbNameAliases()
            .then(setDbAliases)
            .catch((err) => console.error("Ошибка при получении данных:", err));
    }, []);

    const startEdit = (db: DbNameAlias) => {
        setIsEditing(true);
        setEditedDbAlias(db);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditedDbAlias(null);
    };

    const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target; // name: 'alias_name' | 'description'
        setEditedDbAlias((prev) =>
            prev ? ({ ...prev, [name]: value } as DbNameAlias) : prev
        );
    };

    const saveEdit = async () => {
        if (!editedDbAlias || saving) return;
        setSaving(true);
        try {
            const updated = await updateDbNameAlias(editedDbAlias.id, {
                alias_name: editedDbAlias.alias_name,
                // если хочется хранить пустое поле как null — раскомментируй следующую строку:
                // description: editedDbAlias.description?.trim() ? editedDbAlias.description : null,
                description: editedDbAlias.description,
            });

            setDbAliases((prev) =>
                prev.map((item) => (item.id === updated.id ? updated : item))
            );
            setIsEditing(false);
            setEditedDbAlias(null);
        } catch (err) {
            console.error("Ошибка при сохранении данных:", err);
        } finally {
            setSaving(false);
        }
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
                                {alias.description && (
                                    <p className={styles.dbDescription}>{alias.description}</p>
                                )}
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
                        value={editedDbAlias.description ?? ""} // контролируемое поле
                        onChange={onFieldChange}
                        className={styles.inputField}
                    />

                    <div className={styles.buttonGroup}>
                        <button className={styles.saveBtn} onClick={saveEdit} disabled={saving}>
                            {saving ? "Сохраняем…" : "Сохранить"}
                        </button>
                        <button className={styles.cancelBtn} onClick={cancelEdit} disabled={saving}>
                            Отменить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Databases;
