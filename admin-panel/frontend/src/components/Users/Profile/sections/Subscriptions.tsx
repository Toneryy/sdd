// src/components/Users/Profile/sections/Subscriptions.tsx
import styles from "../Profile.module.scss";
import { UserSub } from "../hooks";

type Props = {
    items: UserSub[];
    onSelect: (item: UserSub) => void;
};

export default function Subscriptions({ items, onSelect }: Props) {
    return (
        <section className={styles.section}>
            <h3 className={styles.subheading}>Подписки</h3>
            {items.length === 0 ? (
                <p>Нет активных подписок</p>
            ) : (
                <ul className={styles.subList}>
                    {items.map((s) => (
                        <li
                            key={s.id}
                            className={styles.subItem}
                            onClick={() => onSelect(s)}
                        >
                            {s.subscriptions?.title || "—"} — с{" "}
                            {new Date(s.start_date).toLocaleDateString()} до{" "}
                            {new Date(s.end_date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
