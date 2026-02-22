// frontend/src/pages/ProductDetailsPage/ProductDetails.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductDetails.module.scss';

interface ProductDetailsData {
    products?: {
        name?: string;
        price?: number;
        description?: string;
    };
    manual?: string;
    code?: string;
}

const ProductDetails: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = (location.state as { product?: ProductDetailsData })?.product;

    if (!product) {
        return <p className={styles.noData}>Нет данных о товаре.</p>;
    }

    return (
        <div className={styles.productDetails}>
            <button className={styles.backButton} onClick={() => navigate('/profile')}>← Вернуться</button>

            <div className={styles.card}>
                <h1 className={styles.title}>{product.products?.name || 'Товар'}</h1>
                <p><strong>Номер заказа:</strong> 213-412</p>
                <p><strong>Цена:</strong> {product.products?.price ? `${product.products.price}₽` : 'Не указана'}</p>
                <p><strong>Описание:</strong> {product.products?.description || 'Нет описания'}</p>
                <p><strong>Инструкция:</strong> {product.manual || 'Не предоставлена'}</p>
                <p><strong>Ключ активации:</strong> {product.code || 'В обработке...'}</p>
            </div>
        </div>
    );
};

export default ProductDetails;
