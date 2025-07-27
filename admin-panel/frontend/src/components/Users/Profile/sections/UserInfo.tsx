// src/components/Users/Profile/sections/UserInfo.tsx
import styles from "../Profile.module.scss";

type Props = {
    user: any;
};

export default function UserInfo({ user }: Props) {
    const handleCopy = (label: string, value: string) => {
        navigator.clipboard.writeText(value);
        // toast в родителе уже подключён, поэтому просто dispatch события
        document.dispatchEvent(
            new CustomEvent("copy-toast", { detail: `Значение ${label} скопировано!` })
        );
    };

    return (
        <section className={styles.section}>
            <h3 className={styles.subheading}>Основная информация</h3>

            <p className={styles.copyable} onClick={() => handleCopy("ID", user.id)}>
                <strong>ID:</strong> {user.id}
            </p>
            <p
                className={styles.copyable}
                onClick={() => handleCopy("Имя", user.username || "")}
            >
                <strong>Имя:</strong> {user.username || "—"}
            </p>
            <p
                className={styles.copyable}
                onClick={() => handleCopy("Email", user.email || "")}
            >
                <strong>Email:</strong> {user.email || "—"}
            </p>
            <p
                className={styles.copyable}
                onClick={() => handleCopy("Телефон", user.phone || "")}
            >
                <strong>Телефон:</strong> {user.phone || "—"}
            </p>
            <p>
                <strong>Создан:</strong>{" "}
                {new Date(user.created_at).toLocaleString()}
            </p>
        </section>
    );
}
