// /src/components/PromoCodes.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PromoCodes.module.scss';

const PromoCodes: React.FC = () => {
    const [promoCodes, setPromoCodes] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/promocodes')
            .then(response => setPromoCodes(response.data))
            .catch(error => console.error('Ошибка при получении данных', error));
    }, []);

    return (
        <div className={styles.promoCodes}>
            <h1 className={styles.title}>Промокоды</h1>
            <button className={styles.addButton}>Добавить промокод</button>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Код</th>
                        <th>Скидка</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {promoCodes.map((promo: any) => (
                        <tr key={promo.id}>
                            <td>{promo.code}</td>
                            <td>{promo.denomination} %</td>
                            <td>
                                <button className={styles.editButton}>Редактировать</button>
                                <button className={styles.deleteButton}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PromoCodes;
