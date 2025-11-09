import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./Shop.module.scss";
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import ProductGrid from "./ProductGrid";

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'available_desc';

const Shop: React.FC = () => {
    const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", category: "", inStock: true });
    const [searchInput, setSearchInput] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>('default');

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