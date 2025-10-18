// src/components/ProductGrid/ProductGrid.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import styles from "./ProductGrid.module.scss";
import { fetchProducts, Product } from "../../api/shop";
import { getSearchVariants } from "../../utils/keyboardAndTranslit";
import { FaHeart } from "react-icons/fa";
import { loadFavorites, saveFavorites } from "utils/favoritesStorage";

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
    inStock: boolean;
}

interface Props {
    filters: Filters;
    searchInput: string;
}

const ProductGrid: React.FC<Props> = ({ filters, searchInput }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Для управления «избранным»
    const [favIds, setFavIds] = useState<Set<string>>(new Set());

    // Пагинация
    const width = useWindowWidth();
    const itemsPerPage = width >= 1024 ? 12 : width >= 768 ? 8 : 4;
    const [currentPage, setCurrentPage] = useState(1);

    // При монтировании читаем текущее «избранное»
    useEffect(() => {
        const raw = loadFavorites();
        setFavIds(new Set(raw.map(p => p.id)));
    }, []);

    // Загрузка товаров
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchProducts(filters.minPrice, filters.maxPrice, filters.category, filters.inStock)
            .then(res => {
                setProducts(res.data);
                setCurrentPage(1);
            })
            .catch(() => setError("Ошибка при загрузке товаров"))
            .finally(() => setLoading(false));
    }, [filters]);

    // Добавление/удаление из «избранного»
    const toggleFavorite = (product: Product, e: React.MouseEvent) => {
        e.preventDefault();
        const raw = loadFavorites();
        let updated: Product[];
        if (favIds.has(product.id)) {
            updated = raw.filter(p => p.id !== product.id);
        } else {
            updated = [...raw, product];
        }
        saveFavorites(updated);
        setFavIds(new Set(updated.map(p => p.id)));
    };

    const sourceProducts = useMemo(() => {
        return filters.inStock ? products.filter(p => p.available > 0) : products;
    }, [products, filters.inStock]);

    // Fuse.js-инстанс
    const fuse = useMemo(
        () =>
            new Fuse(sourceProducts, {
                keys: ["name"],
                threshold: 0.4,
                ignoreLocation: true,
                minMatchCharLength: 1,
            }),
        [sourceProducts]
    );

    // Варианты поиска
    const variants = useMemo(() => {
        const txt = searchInput.trim().toLowerCase();
        return txt ? getSearchVariants(txt) : [];
    }, [searchInput]);

    // Точные substring результаты
    const substringResults = useMemo(() => {
        if (!variants.length) return sourceProducts;
        return sourceProducts.filter(p =>
            variants.some(v => p.name.toLowerCase().includes(v))
        );
    }, [sourceProducts, variants]);

    // Итоговый список перед пагинацией
    const filtered = useMemo(() => {
        if (!searchInput.trim()) return sourceProducts;
        if (substringResults.length > 0) return substringResults;
        const map = new Map<string, Product>();
        variants.forEach(term =>
            fuse.search(term).forEach(({ item }) => map.set(item.id, item))
        );
        return Array.from(map.values());
    }, [sourceProducts, searchInput, substringResults, fuse, variants]);

    // Пагинированные данные
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const pageItems = filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Рендер
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
                                <div className={styles.cardOverlay}>
                                    <button
                                        className={`${styles.heartBtn} ${favIds.has(p.id) ? styles.favorited : ""
                                            }`}
                                        onClick={e => toggleFavorite(p, e)}
                                        title={
                                            favIds.has(p.id)
                                                ? "Убрать из избранного"
                                                : "Добавить в избранное"
                                        }
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                                <div className={styles.imagePlaceholder}>🎁</div>
                                <h4 className={styles.name}>{p.name}</h4>
                                <p className={styles.price}>{p.price.toLocaleString()} ₽</p>
                                {p.available > 0 ? (
                                    <button className={styles.buyBtn}>Купить</button>
                                ) : (
                                    <span className={styles.soldOut}>Нет в наличии</span>
                                )}
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
