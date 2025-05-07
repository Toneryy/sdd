// src/components/ProductGrid/ProductGrid.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import styles from "./ProductGrid.module.scss";
import { fetchProducts, Product } from "../../api/shop";
import { getSearchVariants } from "../../utils/keyboardAndTranslit";

// Хук для ширины окна
function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return width;
}

interface Filters {
    minPrice: string;
    maxPrice: string;
    category: string;
}
interface Props {
    filters: Filters;
    searchInput: string;
}

const ProductGrid: React.FC<Props> = ({ filters, searchInput }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // пагинация
    const width = useWindowWidth();
    const itemsPerPage = width >= 1024 ? 12 : width >= 768 ? 8 : 4;
    const [currentPage, setCurrentPage] = useState(1);

    // 1) Загрузка
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchProducts(filters.minPrice, filters.maxPrice, filters.category)
            .then(res => {
                setProducts(res.data);
                setCurrentPage(1); // сброс на первую страницу при смене фильтров
            })
            .catch(() => setError("Ошибка при загрузке товаров"))
            .finally(() => setLoading(false));
    }, [filters]);

    // 2) Fuse.js
    const fuse = useMemo(
        () =>
            new Fuse(products, {
                keys: ["name"],
                threshold: 0.4,
                ignoreLocation: true,
                minMatchCharLength: 1,
            }),
        [products]
    );

    // 3) Варианты поиска
    const variants = useMemo(() => {
        const txt = searchInput.trim().toLowerCase();
        return txt ? getSearchVariants(txt) : [];
    }, [searchInput]);

    // 4) Точные substring результаты
    const substringResults = useMemo(() => {
        if (!variants.length) return products;
        return products.filter(p =>
            variants.some(v => p.name.toLowerCase().includes(v))
        );
    }, [products, variants]);

    // 5) Итоговый список перед пагинацией
    const filtered = useMemo(() => {
        if (!searchInput.trim()) return products;
        if (substringResults.length > 0) return substringResults;
        const map = new Map<string, Product>();
        variants.forEach(term =>
            fuse.search(term).forEach(({ item }) => map.set(item.id, item))
        );
        return Array.from(map.values());
    }, [products, searchInput, substringResults, fuse, variants]);

    // 6) Пагинированные данные
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const pageItems = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // 7) Рендер
    if (loading) return <p className={styles.loading}>Загрузка товаров...</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (filtered.length === 0)
        return (
            <div className={styles.emptyState}>
                <p>😕 Ничего не найдено.</p>
            </div>
        );

    return (
        <>
            <div className={styles.gridWrapper}>
                <div className={styles.grid}>
                    {pageItems.map(p => (
                        <Link key={p.id} to={`/shop/${p.id}`} className={styles.cardLink}>
                            <div className={styles.card}>
                                <div className={styles.imagePlaceholder}>🎁</div>
                                <h4 className={styles.name}>{p.name}</h4>
                                <p className={styles.price}>{p.price.toLocaleString()} ₽</p>
                                <button className={styles.buyBtn}>Купить</button>
                            </div>
                        </Link>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={
                                    i + 1 === currentPage
                                        ? `${styles.pageBtn} ${styles.active}`
                                        : styles.pageBtn
                                }
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductGrid;
