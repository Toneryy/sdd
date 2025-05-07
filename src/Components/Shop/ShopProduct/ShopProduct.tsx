// src/components/Shop/ShopProduct/ShopProduct.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ShopProduct.module.scss";
import { fetchProductById, Product } from "../../../api/shop";

const ShopProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetchProductById(id)
            .then((res) => setProduct(res.data))
            .catch(() => setError("Не удалось загрузить товар"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className={styles.status}>Загрузка...</p>;
    if (error) return <p className={styles.statusError}>{error}</p>;
    if (!product) return <p className={styles.statusError}>Товар не найден</p>;

    return (
        <div className={styles.container}>
            <Link to="/shop" className={styles.backLink}>
                ← Назад к каталогу
            </Link>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    {/* В будущем можно вставить изображение товара */}
                    <div className={styles.imageWrapper}>
                        {product.img ? (
                            <img src={product.img} alt={product.name} className={styles.image} />
                        ) : (
                            <div className={styles.imagePlaceholder}>🎁</div>
                        )}
                    </div>

                </div>
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <p className={styles.price}>{product.price.toLocaleString()} ₽</p>
                    <p className={styles.category}>
                        Категория: <span>{product.category || "Без категории"}</span>
                    </p>
                    <div className={styles.description}>
                        <h2>Описание</h2>
                        <p>{product.description || "Описание скоро будет добавлено."}</p>
                    </div>
                    <div className={styles.instruction}>
                        <h2>Инструкция по активации</h2>
                        <ol>
                            <li>После покупки вы получите ключ активации на вашу почту.</li>
                            <li>Перейдите на официальный сайт соответствующего сервиса.</li>
                            <li>Войдите в свой аккаунт или зарегистрируйтесь.</li>
                            <li>Введите полученный ключ в разделе «Активация».</li>
                            <li>Подтвердите, и продукт будет доступен в вашем аккаунте.</li>
                        </ol>
                    </div>
                    <button className={styles.buyBtn}>Купить</button>
                </div>
            </div>
        </div>
    );
};

export default ShopProduct;
