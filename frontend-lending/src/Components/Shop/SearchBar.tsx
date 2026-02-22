// src/components/SearchBar/SearchBar.tsx
import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import styles from "./SearchBar.module.scss";

interface Props {
    onSearch: (term: string) => void;
    searchValue?: string;
}

const SearchBar: React.FC<Props> = ({ onSearch, searchValue = "" }) => {
    const [input, setInput] = useState(searchValue);
    const onSearchRef = useRef(onSearch);

    // Обновляем ref при изменении onSearch
    useEffect(() => {
        onSearchRef.current = onSearch;
    }, [onSearch]);

    // Синхронизация с внешним значением
    useEffect(() => {
        setInput(searchValue);
    }, [searchValue]);

    // Real-time поиск с debounce (улучшенная версия)
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchRef.current(input.trim());
        }, 300);

        return () => clearTimeout(timer);
    }, [input]);

    const handleClear = () => {
        setInput("");
        onSearch("");
    };

    return (
        <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input
                type="text"
                placeholder="Поиск по названию..."
                className={styles.searchInput}
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            {input && (
                <button 
                    type="button"
                    className={styles.clearSearchBtn} 
                    onClick={handleClear}
                    aria-label="Очистить поиск"
                >
                    <FiX />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
