// src/components/ProductGrid/ProductGrid.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import styles from "./ProductGrid.module.scss";
import { fetchProducts, Product } from "../../api/shop";
import { getSearchVariants } from "../../utils/keyboardAndTranslit";
import { FiHeart } from "react-icons/fi";

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

    // Для управления «сердечками»
    const [cartIds, setCartIds] = useState<Set<string>>(new Set());

    // пагинация
    const width = useWindowWidth();
    const itemsPerPage = width >= 1024 ? 12 : width >= 768 ? 8 : 4;
    const [currentPage, setCurrentPage] = useState(1);

    // 0) При монтировании читаем текущую корзину из localStorage
    useEffect(() => {
        const raw: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
        const ids = new Set(raw.map((p) => p.id));
        setCartIds(ids);
    }, []);

    // 1) Загрузка товаров
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchProducts(filters.minPrice, filters.maxPrice, filters.category)
            .then((res) => {
                setProducts(res.data);
                setCurrentPage(1);
            })
            .catch(() => setError("Ошибка при загрузке товаров"))
            .finally(() => setLoading(false));
    }, [filters]);

    // Добавить или удалить из корзины
    const toggleCart = (product: Product, e: React.MouseEvent) => {
        e.preventDefault();
        const raw: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
        let updated: Product[];
        if (cartIds.has(product.id)) {
            // удалить все копии
            updated = raw.filter((p) => p.id !== product.id);
        } else {
            // добавить один экземпляр
            updated = [...raw, product];
        }
        localStorage.setItem("cart", JSON.stringify(updated));
        // обновить состояние сердечек
        const ids = new Set(updated.map((p) => p.id));
        setCartIds(ids);
    };

    // 2) Fuse.js-инстанс
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
        return products.filter((p) =>
            variants.some((v) => p.name.toLowerCase().includes(v))
        );
    }, [products, variants]);

    // 5) Итоговый список перед пагинацией
    const filtered = useMemo(() => {
        if (!searchInput.trim()) return products;
        if (substringResults.length > 0) return substringResults;
        const map = new Map<string, Product>();
        variants.forEach((term) =>
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
                    {pageItems.map((p) => (
                        <Link
                            key={p.id}
                            to={`/shop/${p.id}`}
                            className={styles.cardLink}
                        >
                            <div className={styles.card}>
                                <div className={styles.cardOverlay}>
                                    <button
                                        className={`${styles.heartBtn} ${cartIds.has(p.id) ? styles.favorited : ""
                                            }`}
                                        onClick={(e) => toggleCart(p, e)}
                                        title={
                                            cartIds.has(p.id)
                                                ? "Убрать из избранного"
                                                : "Добавить в избранное"
                                        }
                                    >
                                        <FiHeart />
                                    </button>
                                </div>
                                <div className={styles.imagePlaceholder}>🎁</div>
                                <h4 className={styles.name}>{p.name}</h4>
                                <p className={styles.price}>
                                    {p.price.toLocaleString()} ₽
                                </p>
                                {p.available > 0 ? (
                                    <button className={styles.buyBtn}>Купить</button>
                                ) : (
                                    <span className={styles.soldOut}>
                                        Нет в наличии
                                    </span>
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
