// src/components/ProductGrid/ProductGrid.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Fuse from "fuse.js";
import { FiShoppingCart, FiHeart, FiZap, FiChevronDown } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import styles from "./ProductGrid.module.scss";
import { fetchProducts, Product } from "../../api/shop";
import { getSearchVariants } from "../../utils/keyboardAndTranslit";
import { useFavoritesStore } from "../../store/favorites";
import { useCartStore } from "../../store/cart";
import Skeleton from "../Skeleton/Skeleton";
import AnimatedCard from "../AnimatedCard";

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'available_desc';

interface Filters {
    minPrice: string;
    maxPrice: string;
    category: string;
    inStock: boolean;
}

interface Props {
    filters: Filters;
    searchInput: string;
    sortBy: SortOption;
}

const ProductGrid: React.FC<Props> = ({ filters, searchInput, sortBy }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [displayCount, setDisplayCount] = useState(20);

    // Для управления «избранным» (Zustand)
    const favIdsArr = useFavoritesStore(s => s.ids);
    const toggleFav = useFavoritesStore(s => s.toggle);
    const favIds = useMemo(() => new Set(favIdsArr), [favIdsArr]);

    // Корзина
    const addToCart = useCartStore(s => s.add);

    // Загрузка товаров
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);
        fetchProducts(filters.minPrice, filters.maxPrice, filters.category, filters.inStock)
            .then(res => {
                if (mounted) {
                    setProducts(res.data);
                    setDisplayCount(20);
                }
            })
            .catch(() => {
                if (mounted) {
                    setError("Ошибка при загрузке товаров");
                }
            })
            .finally(() => {
                if (mounted) {
                    setLoading(false);
                }
            });
        
        return () => {
            mounted = false;
        };
    }, [filters]);

    // Добавление/удаление из «избранного»
    const handleToggleFavorite = (product: Product, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const isFav = favIds.has(product.id);
        toggleFav(product.id);
        toast.info(
            isFav ? 'Удалено из избранного' : 'Добавлено в избранное',
            { toastId: `fav-${product.id}` }
        );
    };

    // Добавление в корзину
    const handleAddToCart = (product: Product, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: 1,
            available: product.available,
            type: 'product',
        });
        toast.success(`${product.name} добавлен в корзину!`);
    };

    const sourceProducts = useMemo(() => {
        let result = filters.inStock ? products.filter(p => p.available > 0) : products;
        
        // Фильтр по цене
        if (filters.minPrice) {
            const min = parseFloat(filters.minPrice);
            result = result.filter(p => p.price >= min);
        }
        if (filters.maxPrice) {
            const max = parseFloat(filters.maxPrice);
            result = result.filter(p => p.price <= max);
        }
        
        return result;
    }, [products, filters]);

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

    // Итоговый список после поиска
    const filtered = useMemo(() => {
        if (!searchInput.trim()) return sourceProducts;
        if (substringResults.length > 0) return substringResults;
        const map = new Map<string, Product>();
        variants.forEach(term =>
            fuse.search(term).forEach(({ item }) => map.set(item.id, item))
        );
        return Array.from(map.values());
    }, [sourceProducts, searchInput, substringResults, fuse, variants]);

    // Сортировка
    const sorted = useMemo(() => {
        const result = [...filtered];
        switch (sortBy) {
            case 'price_asc':
                return result.sort((a, b) => a.price - b.price);
            case 'price_desc':
                return result.sort((a, b) => b.price - a.price);
            case 'name_asc':
                return result.sort((a, b) => a.name.localeCompare(b.name));
            case 'name_desc':
                return result.sort((a, b) => b.name.localeCompare(a.name));
            case 'available_desc':
                return result.sort((a, b) => b.available - a.available);
            default:
                return result;
        }
    }, [filtered, sortBy]);

    // Показываем первые N товаров
    const displayed = sorted.slice(0, displayCount);
    const hasMore = displayCount < sorted.length;

    const handleLoadMore = () => {
        setDisplayCount(prev => prev + 20);
    };

    // Рендер
    if (loading) {
        return (
            <div className={styles.gridWrapper}>
                <div className={styles.grid}>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className={styles.skeletonCard}>
                            <div className={styles.skeletonImage} />
                            <div className={styles.skeletonContent}>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <Skeleton width="80%" height={20} />
                                </div>
                                <Skeleton width="50%" height={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorState}>
                <p>❌ {error}</p>
            </div>
        );
    }

    if (sorted.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🔍</div>
                <h3>Ничего не найдено</h3>
                <p>
                    {searchInput.trim() 
                        ? `По запросу "${searchInput}" ничего не найдено.`
                        : 'Товары с выбранными фильтрами не найдены.'
                    }
                </p>
                <div className={styles.emptySuggestions}>
                    <p className={styles.suggestionTitle}>Попробуйте:</p>
                    <ul>
                        <li>Изменить параметры поиска</li>
                        <li>Сбросить фильтры</li>
                        <li>Проверить правильность написания</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.gridWrapper}>
            {sorted.length > 0 && (
                <p className={styles.resultsInfo}>
                    Найдено: <strong>{sorted.length}</strong> {sorted.length === 1 ? 'товар' : sorted.length < 5 ? 'товара' : 'товаров'}
                </p>
            )}
            
            <div className={styles.grid}>
                {displayed.map((p, index) => {
                    const isFavorite = favIds.has(p.id);
                    return (
                        <AnimatedCard 
                            key={p.id} 
                            delay={index * 50}
                            className={styles.card}
                        >
                            <Link to={`/shop/${p.id}`} className={styles.cardLink}>
                                <div className={styles.imageWrapper}>
                                    {p.img ? (
                                        <img src={p.img} alt={p.name} className={styles.image} loading="lazy" />
                                    ) : (
                                        <div className={styles.imagePlaceholder}>
                                            <FiZap />
                                        </div>
                                    )}
                                    <button
                                        className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
                                        onClick={(e) => handleToggleFavorite(p, e)}
                                        aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                                    >
                                        {isFavorite ? <FaHeart /> : <FiHeart />}
                                    </button>
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.name}>{p.name}</h3>
                                    <div className={styles.cardFooter}>
                                        <div className={styles.price}>
                                            {p.price === 0 ? (
                                                <span className={styles.priceFree}>Бесплатно</span>
                                            ) : (
                                                <>
                                                    <span className={styles.priceValue}>{p.price.toLocaleString()}</span>
                                                    <span className={styles.priceCurrency}>₽</span>
                                                </>
                                            )}
                                        </div>
                                        {p.available > 0 ? (
                                            <span className={styles.available}>В наличии: {p.available}</span>
                                        ) : (
                                            <span className={styles.outOfStock}>Нет в наличии</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            {p.available > 0 && (
                                <button 
                                    className={styles.addToCartBtn}
                                    onClick={(e) => handleAddToCart(p, e)}
                                >
                                    <FiShoppingCart />
                                    <span>В корзину</span>
                                </button>
                            )}
                        </AnimatedCard>
                    );
                })}
            </div>

            {hasMore && (
                <div className={styles.loadMoreContainer}>
                    <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
                        <span>Показать еще</span>
                        <FiChevronDown />
                        <span className={styles.loadMoreCount}>
                            ({sorted.length - displayCount} из {sorted.length})
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
