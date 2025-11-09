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
    filters: Filters;
    onApply: (filters: Filters) => void;
}

const FiltersSidebar: React.FC<FiltersProps> = ({ filters, onApply }) => {
    const [category, setCategory] = useState(filters.category);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Синхронизация category с внешним состоянием
    useEffect(() => {
        setCategory(filters.category);
    }, [filters.category]);

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
        onApply({ ...filters, inStock: e.target.checked });
    };

    // автоприменение категории
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setCategory(val);
        onApply({ ...filters, category: val });
    };

    return (
        <div className={styles.sidebar}>
            <h3>Фильтры</h3>

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
                            checked={filters.inStock}
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
        </div>
    );
};

export default FiltersSidebar;
