// src/components/Shop/ShopProduct/ShopProduct.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./ShopProduct.module.scss";
import { fetchProductById, Product } from "../../../api/shop";
import {
    addToCart,
    isInCart,
    CartItem,
} from "../../../utils/cartStorage";

const ShopProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetchProductById(id)
            .then((res) => {
                setProduct(res.data);
                setInCart(isInCart(res.data.id));
            })
            .catch(() => {
                setError("Не удалось загрузить товар");
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddToCart = () => {
        if (!product) {
            toast.error("Товар не найден");
            return;
        }
        if (product.available === 0) {
            toast.error("Товар отсутствует на складе");
            return;
        }

        const item: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: 1,
            available: product.available,
        };

        addToCart(item);
        setInCart(true);
        toast.success("Товар добавлен в корзину");
    };

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
                    {product.img ? (
                        <img src={product.img} alt={product.name} className={styles.image} />
                    ) : (
                        <div className={styles.imagePlaceholder}>🎁</div>
                    )}
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

                    {product.available === 0 ? (
                        <button className={styles.disabledBtn} disabled>
                            Нет в наличии
                        </button>
                    ) : inCart ? (
                        <button
                            className={styles.buyBtn}
                            onClick={() => navigate("/cart")}
                        >
                            Перейти в корзину
                        </button>
                    ) : (
                        <button className={styles.buyBtn} onClick={handleAddToCart}>
                            Добавить в корзину
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopProduct;
