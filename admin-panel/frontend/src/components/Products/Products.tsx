import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getProducts, addProduct, updateProduct, deleteProduct } from '../../api/products';
import { getCategories, addCategory, deleteCategory, updateCategory } from '../../api/categories';
import { getSubscriptions, addSubscription, deleteSubscription, updateSubscription } from '../../api/subscriptions';
import EditModal from './EditModal/EditModal';
import DeleteConfirmation from './DeleteConfirmation/DeleteConfirmation';
import { API_URL } from '../../utils/api';

import styles from './Products.module.scss';

/* -------------------------------------------------- */
/*  типы                                              */
/* -------------------------------------------------- */
type TableName = 'products' | 'categories' | 'subscriptions' | '';
type ModalTable = Exclude<TableName, ''>; // только реальные таблицы

interface Category {
    id: string;
    name: string;
}

/* -------------------------------------------------- */
/*  компонент                                         */
/* -------------------------------------------------- */
export default function Products() {
    /* ---------- модальные окна и выбранная строка ---------- */
    const [currentItemId, setCurrentItemId] = useState<string | null>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    /* ---------- алиасы таблиц ---------- */
    const [aliases, setAliases] = useState<
        { table_name: TableName; alias_name: string }[]
    >([]);

    /* ---------- состояние таблиц ---------- */
    const [table, setTable] = useState<TableName>('');
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    /* ---------- категории ---------- */
    const [categories, setCategories] = useState<Category[]>([]);

    /* ---------- форма для добавления ---------- */
    const blank = {
        name: '',
        price: '',
        description: '',
        img: '',
        category_id: '',
        title: '',
        duration_days: '',
        image: '',
    };
    const [form, setForm] = useState<typeof blank>(blank);

    /* ---------- алиасы из db_name_aliases ---------- */
    useEffect(() => {
        axios
            .get(`${API_URL}/db-name-aliases`)
            .then(({ data }) =>
                setAliases(
                    data.filter((a: any) =>
                        ['products', 'categories', 'subscriptions'].includes(a.table_name),
                    ),
                )
            )
            .catch(console.error);
    }, []);

    /* ---------- категории один раз ---------- */
    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    /* ---------- загрузка строк выбранной таблицы ---------- */
    const fetchRows = async (tbl: TableName) => {
        if (!tbl) return;
        setLoading(true);
        try {
            if (tbl === 'products') setRows(await getProducts());
            if (tbl === 'categories') setRows(await getCategories());
            if (tbl === 'subscriptions') setRows(await getSubscriptions());
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    /* ---------- обработчики ---------- */
    const handleSelectTable = (tbl: TableName) => {
        setTable(tbl);
        setForm(blank);
        fetchRows(tbl);
    };

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let created: any;
            if (table === 'products')
                created = await addProduct({
                    name: form.name,
                    price: form.price,
                    description: form.description,
                    img: form.img,
                    category_id: form.category_id || null,
                });

            if (table === 'categories') created = await addCategory({ name: form.name });

            if (table === 'subscriptions')
                created = await addSubscription({
                    title: form.title,
                    duration_days: Number(form.duration_days),
                    price: form.price,
                    description: form.description,
                    image: form.image,  // передаем image
                });

            setRows([...rows, created]);
            setForm(blank);
        } catch (err) {
            console.error('Ошибка при добавлении:', err);
        }
    };

    const getAlias = (tbl: TableName) =>
        aliases.find((a) => a.table_name === tbl)?.alias_name ?? tbl;

    const handleDelete = async () => {
        if (!currentItemId) return;

        try {
            if (table === 'products') await deleteProduct(currentItemId);
            if (table === 'categories') await deleteCategory(currentItemId);
            if (table === 'subscriptions') await deleteSubscription(currentItemId);

            setRows(prev => prev.filter(r => r.id !== currentItemId));
            toast.info('Запись удалена');
        } catch (e) {
            console.error(e);
            toast.error('Не удалось удалить запись');
        } finally {
            setDeleteModalVisible(false);
            setCurrentItemId(null);
        }
    };

    const currentItem = rows.find((r) => r.id === currentItemId) ?? null;

    /* ---------- редактирование товара ----------- */
    const handleSaveEdit = async (upd: any) => {
        try {
            let saved: any;
            if (table === 'products') saved = await updateProduct(upd.id, upd);

            if (table === 'categories')
                saved = await updateCategory(upd.id, { name: upd.name });

            if (table === 'subscriptions')
                saved = await updateSubscription(upd.id, {
                    title: upd.title,
                    duration_days: upd.duration_days,
                    price: upd.price,
                    description: upd.description,
                    image: upd.image,  // передаем поле image
                });

            setRows((prev) =>
                prev.map((r) => (r.id === saved.id ? saved : r))
            );
            toast.success('Изменения сохранены');
            setEditModalVisible(false);
        } catch (e) {
            console.error(e);
            toast.error('Не удалось сохранить изменения');
        }
    };

    return (
        <div className={styles.productEditor}>
            <h1 className={styles.title}>Админ-редактор</h1>

            {/* ---------- выбор таблицы ---------- */}
            <div className={styles.tableSelector}>
                <h3 className={styles.subtitle}>1. Выберите раздел</h3>
                {aliases.map((a) => (
                    <button
                        key={a.table_name}
                        className={table === a.table_name ? styles.activeButton : styles.selectBtn}
                        onClick={() => handleSelectTable(a.table_name)}
                    >
                        {a.alias_name}
                    </button>
                ))}
            </div>

            {/* ---------- форма добавления ---------- */}
            {table && (
                <>
                    <h3 className={styles.subtitle}>
                        2. Добавить запись в «{getAlias(table)}»
                    </h3>

                    <form onSubmit={handleAdd} className={styles.form}>
                        {table === 'products' && (
                            <>
                                <div className={styles.formField}>
                                    <input
                                        name="name"
                                        placeholder="Название"
                                        value={form.name}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <input
                                        name="price"
                                        placeholder="Цена"
                                        type="number"
                                        value={form.price}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <input
                                        name="description"
                                        placeholder="Описание"
                                        value={form.description}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <input
                                        name="img"
                                        placeholder="URL картинки"
                                        value={form.img}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <select
                                        name="category_id"
                                        value={form.category_id}
                                        onChange={onChange}
                                        required
                                    >
                                        <option value="">Категория</option>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}

                        {table === 'categories' && (
                            <div className={styles.formField}>
                                <input
                                    name="name"
                                    placeholder="Название категории"
                                    value={form.name}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        )}

                        {table === 'subscriptions' && (
                            <>
                                <div className={styles.formField}>
                                    <input
                                        name="title"
                                        placeholder="Название подписки"
                                        value={form.title}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <input
                                        name="duration_days"
                                        type="number"
                                        placeholder="Длительность (дни)"
                                        value={form.duration_days}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <input
                                        name="price"
                                        placeholder="Цена"
                                        type="number"
                                        value={form.price}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <input
                                        name="description"
                                        placeholder="Описание"
                                        value={form.description}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className={styles.formField}>
                                    <input
                                        name="image"
                                        placeholder="URL изображения"
                                        value={form.image}
                                        onChange={onChange}
                                    />
                                </div>
                            </>
                        )}

                        <button type="submit" className={styles.submitButton}>
                            Добавить
                        </button>
                    </form>
                </>
            )}

            {/* ---------- таблица данных ---------- */}
            {table && (
                <>
                    <h3 className={styles.subtitle}>
                        3. Содержимое «{getAlias(table)}»
                    </h3>

                    {loading ? (
                        <p>Загрузка…</p>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    {table === 'products' && (
                                        <>
                                            <th>Название</th>
                                            <th>Цена</th>
                                            <th>Категория</th>
                                            <th>Фотография</th>
                                        </>
                                    )}
                                    {table === 'categories' && <th>Название</th>}
                                    {table === 'subscriptions' && (
                                        <>
                                            <th>Название</th>
                                            <th>Дней</th>
                                            <th>Цена</th>
                                            <th>Фотография</th>
                                        </>
                                    )}
                                    <th>Действия</th>
                                </tr>
                            </thead>

                            <tbody>
                                {rows.map((r: any) => (
                                    <tr key={r.id}>
                                        {table === 'products' && (
                                            <>
                                                <td>{r.name}</td>
                                                <td>{r.price}</td>
                                                <td>{r.categories?.name ?? '—'}</td>
                                                <td>
                                                    {r.image ? (
                                                        <img src={r.image} alt="sub" className={styles.imgPreview} width={40} />
                                                    ) : (
                                                        '—'
                                                    )}
                                                </td>

                                            </>
                                        )}

                                        {table === 'categories' && <td>{r.name}</td>}

                                        {table === 'subscriptions' && (
                                            <>
                                                <td>{r.title}</td>
                                                <td>{r.duration_days}</td>
                                                <td>{r.price}</td>
                                                <td>
                                                    {r.image ? (
                                                        <img src={r.image} alt="sub" className={styles.imgPreview} width={40} />
                                                    ) : (
                                                        '—'
                                                    )}
                                                </td>
                                            </>
                                        )}

                                        <td>
                                            <button
                                                className={styles.editButton}
                                                onClick={() => {
                                                    setCurrentItemId(r.id);
                                                    setEditModalVisible(true);
                                                }}
                                            >
                                                ✎
                                            </button>
                                            <button
                                                className={styles.deleteButton}
                                                onClick={() => {
                                                    setCurrentItemId(r.id);
                                                    setDeleteModalVisible(true);
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}

            {/* ---------- модалки ---------- */}
            <EditModal
                show={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                table={table as ModalTable}          // кастуем без ''
                item={currentItem}
                onSave={handleSaveEdit}              // исправленный обработчик
            />

            <DeleteConfirmation
                show={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
                onDelete={handleDelete}
            />
        </div>
    );
}
