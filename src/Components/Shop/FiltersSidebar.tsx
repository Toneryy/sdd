// src/components/FiltersSidebar/FiltersSidebar.tsx
import React, { useState, useEffect } from "react";
import styles from "./FiltersSidebar.module.scss";
import { fetchCategories, Category } from "../../api/shop";

interface Filters {
    minPrice: string;
    maxPrice: string;
    category: string;
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

    // 1) Загрузить категории при монтировании
    useEffect(() => {
        setLoading(true);
        fetchCategories()
            .then(res => {
                setCategories(res.data);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError("Не удалось загрузить категории");
            })
            .finally(() => setLoading(false));
    }, []);

    // 2) Если все поля пустые — сразу сбрасываем фильтры
    useEffect(() => {
        if (minPrice === "" && maxPrice === "" && category === "") {
            onApply({ minPrice: "", maxPrice: "", category: "" });
        }
    }, [minPrice, maxPrice, category, onApply]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onApply({ minPrice, maxPrice, category });
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
                    onChange={e => setMinPrice(e.target.value)}
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
                    onChange={e => setMaxPrice(e.target.value)}
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
                    <select
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="">Все</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <button type="submit" className={styles.applyButton}>
                Применить
            </button>
        </form>
    );
};

export default FiltersSidebar;
