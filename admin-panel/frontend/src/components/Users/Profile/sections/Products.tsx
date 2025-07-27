// src/components/Users/Profile/sections/Products.tsx
import styles from "../Profile.module.scss";

type Props = {
    items: any[];
    onSelect: (item: any) => void;
};

export default function Products({ items, onSelect }: Props) {
    return (
        <section className={styles.section}>
            <h3 className={styles.subheading}>Продукты</h3>
            {items.length === 0 ? (
                <p>Нет приобретённых продуктов</p>
            ) : (
                <ul className={styles.subList}>
                    {items.map((p) => (
                        <li
                            key={p.id}
                            className={styles.subItem}
                            onClick={() => onSelect(p)}
                        >
                            {p.products?.name || "—"} — добавлен{" "}
                            {new Date(p.added_at).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
