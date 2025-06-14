// /src/components/Products.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Products.module.scss';

const Products: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        // Пример получения списка товаров
        axios.get('/api/admin/products')  // Для примера, подключим API, чтобы получить данные
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Ошибка при получении данных', error));
    }, []);

    return (
        <div className={styles.productEditor}>
            <h1 className={styles.title}>Редактор товаров</h1>
            <button className={styles.addButton}>Добавить товар</button>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price} ₽</td>
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

export default Products;
