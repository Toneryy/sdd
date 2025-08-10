import { useState } from "react";
import styles from "./Shop.module.scss";
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import ProductGrid from "./ProductGrid";


const Shop = () => {
    const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", category: "", inStock: true, });
    const [searchInput, setSearchInput] = useState("");

    return (
        <div className={styles.shopContainer}>
            <div className={styles.searchWrapper}>
                <SearchBar onSearch={setSearchInput} />
            </div>
            <div className={styles.content}>
                <FiltersSidebar onApply={setFilters} />
                <ProductGrid filters={filters} searchInput={searchInput} />
            </div>
        </div>
    );
};

export default Shop;