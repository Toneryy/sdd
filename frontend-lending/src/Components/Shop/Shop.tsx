import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./Shop.module.scss";
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import ProductGrid from "./ProductGrid";

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'available_desc';

const Shop: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Функция для получения фильтров из URL
    const getFiltersFromUrl = (params: URLSearchParams) => ({
        minPrice: params.get('minPrice') || "",
        maxPrice: params.get('maxPrice') || "",
        category: params.get('category') || "",
        inStock: params.get('inStock') !== 'false',
    });

    const [filters, setFilters] = useState(() => getFiltersFromUrl(searchParams));
    const [searchInput, setSearchInput] = useState(() => searchParams.get('search') || "");
    const [sortBy, setSortBy] = useState<SortOption>(() => (searchParams.get('sort') as SortOption) || 'default');

    // Синхронизация с URL при изменении searchParams (например, при переходе по ссылке)
    useEffect(() => {
        const urlFilters = getFiltersFromUrl(searchParams);
        const urlSearch = searchParams.get('search') || "";
        const urlSort = searchParams.get('sort') as SortOption;
        
        setFilters(urlFilters);
        setSearchInput(urlSearch);
        if (urlSort) {
            setSortBy(urlSort);
        }
    }, [searchParams]);

    // Обновление URL при изменении фильтров (с debounce для производительности)
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams();
            
            if (filters.minPrice) params.set('minPrice', filters.minPrice);
            if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
            if (filters.category) params.set('category', filters.category);
            if (!filters.inStock) params.set('inStock', 'false');
            if (searchInput) params.set('search', searchInput);
            if (sortBy !== 'default') params.set('sort', sortBy);
            
            // Проверяем, изменились ли параметры, чтобы избежать лишних обновлений
            const newParamsString = params.toString();
            const currentParamsString = searchParams.toString();
            
            if (newParamsString !== currentParamsString) {
                setSearchParams(params, { replace: true });
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [filters, searchInput, sortBy, setSearchParams, searchParams]);

    return (
        <>
            <Helmet>
                <title>Магазин - bd-project</title>
                <meta name="description" content="Каталог товаров и активаций" />
            </Helmet>
            
            <section className={styles.shop}>
                <div className={styles.container}>
                    {/* Breadcrumbs */}
                    <nav className={styles.breadcrumbs}>
                        <Link to="/">Главная</Link>
                        <span>/</span>
                        <span>Магазин</span>
                    </nav>

                    {/* Header */}
                    <div className={styles.header}>
                        <h1 className={styles.title}>Магазин</h1>
                        <p className={styles.subtitle}>Широкий выбор товаров и активаций</p>
                    </div>

                    {/* Filters Bar */}
                    <div className={styles.filtersBar}>
                        <SearchBar onSearch={setSearchInput} searchValue={searchInput} />
                        
                        <div className={styles.priceFilters}>
                            <input
                                type="number"
                                placeholder="От"
                                className={styles.priceInput}
                                value={filters.minPrice}
                                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                            />
                            <span className={styles.priceSeparator}>—</span>
                            <input
                                type="number"
                                placeholder="До"
                                className={styles.priceInput}
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                            />
                        </div>

                        <select
                            className={styles.sortSelect}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                        >
                            <option value="default">Сортировать по...</option>
                            <option value="price_asc">Цене: по возрастанию</option>
                            <option value="price_desc">Цене: по убыванию</option>
                            <option value="name_asc">Названию: А-Я</option>
                            <option value="name_desc">Названию: Я-А</option>
                            <option value="available_desc">Наличию: больше → меньше</option>
                        </select>
                    </div>

                    {/* Content */}
                    <div className={styles.content}>
                        <FiltersSidebar filters={filters} onApply={setFilters} />
                        <ProductGrid 
                            filters={filters} 
                            searchInput={searchInput} 
                            sortBy={sortBy}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Shop;