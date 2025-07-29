// src/components/UserSearch/UserSearch.tsx

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import classNames from 'classnames';

import { searchUsers } from 'api/users';
import styles from './UserSearch.module.scss';

type Suggestion = {
    id: string;
    username: string;
    email: string;
    phone: string | null;
};

const UserSearch: React.FC = () => {
    const [query, setQuery] = useState('');
    const [items, setItems] = useState<Suggestion[]>([]);
    const [active, setActive] = useState(-1);
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);

    const request = useMemo(
        () =>
            debounce(async (v: string) => {
                const t = v.trim();
                if (t.length < 4) {
                    setItems([]);
                    return;
                }
                try {
                    const results = await searchUsers(t);
                    setItems(results);
                    setActive(-1);
                } catch {
                    setItems([]);
                }
            }, 300),
        []
    );

    useEffect(() => {
        request(query);
    }, [query, request]);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setItems([]);
            }
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => {
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, []);

    const choose = (u: Suggestion) => {
        navigate(`/admin/users/${u.id}`);
        setQuery('');
        setItems([]);
    };

    const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            setActive(i => Math.min(i + 1, items.length - 1));
        } else if (e.key === 'ArrowUp') {
            setActive(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && active >= 0) {
            choose(items[active]);
        } else if (e.key === 'Escape') {
            setItems([]);
        }
    };

    return (
        <div className={styles.wrapper} ref={ref}>
            <input
                type="search"
                placeholder="Поиск пользователя…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKey}
                className={styles.input}
            />
            {items.length > 0 && (
                <ul className={styles.list}>
                    {items.map((u, i) => (
                        <li
                            key={u.id}
                            className={classNames(styles.item, { [styles.active]: i === active })}
                            onMouseDown={() => choose(u)}
                        >
                            <div className={styles.name}>{u.username}</div>
                            <div className={styles.meta}>
                                <div className={styles.email}>{u.email}</div>
                                {u.phone && <div className={styles.phone}>{u.phone}</div>}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserSearch;
