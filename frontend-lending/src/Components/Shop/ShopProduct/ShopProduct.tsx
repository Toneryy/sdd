// src/components/Shop/ShopProduct/ShopProduct.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import styles from "./ShopProduct.module.scss";
import { fetchProductById, Product } from "../../../api/shop";
import { useCartStore } from "../../../store/cart";
import StructuredData from "../../StructuredData";

const ShopProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [inCart, setInCart] = useState(false);

    const isInCartFn = useCartStore(s => s.isInCart)
    const add = useCartStore(s => s.add)
    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetchProductById(id)
            .then((res) => {
                setProduct(res.data);
                setInCart(isInCartFn(res.data.id));
            })
            .catch(() => setError('Ошибка при загрузке товара'))
            .finally(() => setLoading(false));
    }, [id, isInCartFn]);

    const handleAddToCart = () => {
        if (!product) return;
        add({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: 1,
            available: product.available,
            type: 'product', // товар из магазина
        })
        setInCart(true);
    };

    if (loading) return <p className={styles.status}>Загрузка...</p>;
    if (error) return <p className={styles.statusError}>{error}</p>;
    if (!product) return <p className={styles.statusError}>Товар не найден</p>;

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const productUrl = `${baseUrl}/shop/${product.id}`;

    return (
        <>
            <Helmet>
                <title>{product.name} - bd-project</title>
                <meta name="description" content={product.description || product.name} />
            </Helmet>
            <StructuredData
                type="product"
                data={{
                    name: product.name,
                    description: product.description,
                    image: product.img,
                    price: product.price,
                    priceCurrency: 'RUB',
                    availability: product.available > 0 ? 'InStock' : 'OutOfStock',
                    url: productUrl,
                    category: product.category,
                }}
            />
            <div className={styles.container}>
            <Link to="/shop" className={styles.backLink}>
                ← Назад к каталогу
            </Link>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    {product.img ? (
                        <img src={product.img} alt={product.name} className={styles.image} loading="lazy" />
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
        </>
    );
};

export default ShopProduct;
