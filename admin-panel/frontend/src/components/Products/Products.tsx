// src/components/Products/Products.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getProducts, addProduct } from '../../api/products';
import { getCategories, addCategory } from '../../api/categories';
import { getSubscriptions, addSubscription } from '../../api/subscriptions';
import { API_URL } from '../../utils/api';

import styles from './Products.module.scss';

type TableName = 'products' | 'categories' | 'subscriptions' | '';

interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    img: string | null;
    category_id: string | null;
    categories?: { id: string; name: string } | null;
}

interface Category {
    id: string;
    name: string;
}

interface Subscription {
    id: string;
    title: string;
    duration_days: number;
    price: string;
    description: string | null;
}

export default function Products() {
    /* ------ алиасы таблиц ------ */
    const [aliases, setAliases] = useState<
        { table_name: TableName; alias_name: string }[]
    >([]);

    /* ------ выбранная таблица / данные ------ */
    const [table, setTable] = useState<TableName>('');
    const [rows, setRows] = useState<
        Product[] | Category[] | Subscription[]
    >([]);
    const [loading, setLoading] = useState(false);

    /* ------ категории для селекта ------ */
    const [categories, setCategories] = useState<Category[]>([]);

    /* ------ форма ------ */
    const blank = {
        name: '',
        price: '',
        description: '',
        img: '',
        category_id: '',
        title: '',
        duration_days: '',
    };
    const [form, setForm] = useState<typeof blank>(blank);

    /* ---------- получаем алиасы ---------- */
    useEffect(() => {
        axios
            .get(`${API_URL}/db-name-aliases`)
            .then(({ data }) =>
                setAliases(
                    data.filter((a: any) =>
                        ['products', 'categories', 'subscriptions'].includes(a.table_name),
                    ),
                ),
            )
            .catch(console.error);
    }, []);

    /* ---------- подгружаем категории один раз ---------- */
    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    /* ---------- загрузка записей выбранной таблицы ---------- */
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
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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
                });

            setRows([...rows, created]);
            setForm(blank);
        } catch (err) {
            console.error('Ошибка при добавлении:', err);
        }
    };

    /* ---------- утилита для красивого заголовка ---------- */
    const getAlias = (tbl: TableName) =>
        aliases.find((a) => a.table_name === tbl)?.alias_name ?? tbl;

    /* ---------- JSX ---------- */
    return (
        <div className={styles.productEditor}>
            <h1 className={styles.title}>Админ-редактор</h1>

            {/* выбор таблицы */}
            <div className={styles.tableSelector}>
                <h3>1. Выберите раздел</h3>
                {aliases.map((a) => (
                    <button
                        key={a.table_name}
                        className={
                            table === a.table_name ? styles.activeButton : styles.selectBtn
                        }
                        onClick={() => handleSelectTable(a.table_name)}
                    >
                        {a.alias_name}
                    </button>
                ))}
            </div>

            {/* форма добавления */}
            {table && (
                <>
                    <h3>2. Добавить запись в «{getAlias(table)}»</h3>
                    <form onSubmit={handleAdd} className={styles.form}>
                        {table === 'products' && (
                            <>
                                <input
                                    name="name"
                                    placeholder="Название"
                                    value={form.name}
                                    onChange={onChange}
                                    required
                                />
                                <input
                                    name="price"
                                    placeholder="Цена"
                                    type="number"
                                    value={form.price}
                                    onChange={onChange}
                                    required
                                />
                                <input
                                    name="description"
                                    placeholder="Описание"
                                    value={form.description}
                                    onChange={onChange}
                                    required
                                />
                                <input
                                    name="img"
                                    placeholder="URL картинки"
                                    value={form.img}
                                    onChange={onChange}
                                />
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
                            </>
                        )}

                        {table === 'categories' && (
                            <input
                                name="name"
                                placeholder="Название категории"
                                value={form.name}
                                onChange={onChange}
                                required
                            />
                        )}

                        {table === 'subscriptions' && (
                            <>
                                <input
                                    name="title"
                                    placeholder="Название подписки"
                                    value={form.title}
                                    onChange={onChange}
                                    required
                                />
                                <input
                                    name="duration_days"
                                    type="number"
                                    placeholder="Длительность (дни)"
                                    value={form.duration_days}
                                    onChange={onChange}
                                    required
                                />
                                <input
                                    name="price"
                                    placeholder="Цена"
                                    type="number"
                                    value={form.price}
                                    onChange={onChange}
                                    required
                                />
                                <input
                                    name="description"
                                    placeholder="Описание"
                                    value={form.description}
                                    onChange={onChange}
                                />
                            </>
                        )}

                        <button type="submit" className={styles.submitButton}>
                            Добавить
                        </button>
                    </form>
                </>
            )}

            {/* таблица данных */}
            {table && (
                <>
                    <h3>3. Содержимое «{getAlias(table)}»</h3>
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
                                            <th>IMG</th>
                                        </>
                                    )}
                                    {table === 'categories' && <th>Название</th>}
                                    {table === 'subscriptions' && (
                                        <>
                                            <th>Название</th>
                                            <th>Дней</th>
                                            <th>Цена</th>
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
                                                    {r.img ? (
                                                        <img src={r.img} alt="pic" width={40} />
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
                                            </>
                                        )}
                                        <td>
                                            <button className={styles.editButton}>✎</button>
                                            <button className={styles.deleteButton}>✕</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
}
