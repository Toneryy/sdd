// src/components/Users/Profile/sections/SupportRequests.tsx
import styles from "../Profile.module.scss";
import { SupportRequest } from "../hooks";

type Props = {
    items: SupportRequest[];
    onSelect: (item: SupportRequest) => void;
};

export default function SupportRequests({ items, onSelect }: Props) {
    return (
        <section className={styles.section}>
            <h3 className={styles.subheading}>Сервисные обращения</h3>

            {items.length === 0 ? (
                <p>Нет обращений</p>
            ) : (
                <ul className={styles.subList}>
                    {items.map((r) => (
                        <li
                            key={r.id}
                            className={styles.subItem}
                            onClick={() => onSelect(r)}
                        >
                            {r.title} — {new Date(r.created_at).toLocaleDateString()} —{" "}
                            <strong>{r.status || "—"}</strong>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
