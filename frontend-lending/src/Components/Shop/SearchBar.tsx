// src/components/SearchBar/SearchBar.tsx
import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";

interface Props {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
    const [input, setInput] = useState("");

    // при очистке инпута — показывать все
    useEffect(() => {
        if (input.trim() === "") {
            onSearch("");
        }
    }, [input, onSearch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(input.trim());
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Поиск товаров..."
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <button type="submit">Поиск</button>
        </form>
    );
};

export default SearchBar;
