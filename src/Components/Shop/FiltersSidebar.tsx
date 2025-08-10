import React, { useState, useEffect } from "react";
import styles from "./FiltersSidebar.module.scss";
import { fetchCategories, Category } from "../../api/shop";

interface Filters {
    minPrice: string;
    maxPrice: string;
    category: string;
    inStock: boolean;
}

interface FiltersProps {
    onApply: (filters: Filters) => void;
}

const FiltersSidebar: React.FC<FiltersProps> = ({ onApply }) => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inStock, setInStock] = useState(true); // по умолчанию включен

    // утилита, чтобы не дублировать onApply
    const apply = (patch: Partial<Filters> = {}) => {
        onApply({
            minPrice,
            maxPrice,
            category,
            inStock,
            ...patch, // patch перекрывает актуальные значения
        });
    };

    // загрузка категорий
    useEffect(() => {
        setLoading(true);
        fetchCategories()
            .then((res) => {
                setCategories(res.data);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить категории");
            })
            .finally(() => setLoading(false));
    }, []);

    // автоприменение для чекбокса «В наличии»
    const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.checked;
        setInStock(next);
        apply({ inStock: next });
    };

    // (опционально можно тоже автоприменять категорию)
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setCategory(val);
        // apply({ category: val }); // ← если нужно автоприменение категории
    };

    // цены применяются по кнопке (чтобы не дергать запрос на каждый ввод)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        apply();
    };

    return (
        <form className={styles.sidebar} onSubmit={handleSubmit}>
            <h3>Фильтры</h3>

            <div className={styles.filterGroup}>
                <label htmlFor="minPrice">Цена от:</label>
                <input
                    id="minPrice"
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                />
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="maxPrice">Цена до:</label>
                <input
                    id="maxPrice"
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="10000"
                />
            </div>

            <div className={styles.filterGroup}>
                <label htmlFor="category">Категория:</label>
                {loading ? (
                    <p>Загрузка категорий...</p>
                ) : error ? (
                    <p className={styles.error}>{error}</p>
                ) : (
                    <select id="category" value={category} onChange={handleCategoryChange}>
                        <option value="">Все</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className={styles.filterGroup}>
                <div className={styles.switchRow}>
                    <span className={styles.switchLabel}>В наличии</span>

                    <div className={styles.switchWrap}>
                        <input
                            id="inStock"
                            type="checkbox"
                            className={styles.switchInput}
                            checked={inStock}
                            onChange={handleInStockChange}
                        />
                        {/* Лейбл рисует сам переключатель */}
                        <label htmlFor="inStock" className={styles.switch} aria-hidden="true">
                            <span className={styles.switchThumb} />
                        </label>
                    </div>
                </div>

                <p className={styles.switchHint}>Показывать только товары на складе</p>
            </div>

            <button type="submit" className={styles.applyButton}>
                Применить
            </button>
        </form>
    );
};

export default FiltersSidebar;
