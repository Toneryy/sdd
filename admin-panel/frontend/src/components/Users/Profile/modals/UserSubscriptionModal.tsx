// src/components/Users/Profile/modals/UserSubscriptionModal.tsx
import styles from "../Modal.module.scss";
import ModalWrapper from "../ModalWrapper";

interface Props {
    item: any;
    onClose: () => void;
}

export default function UserSubscriptionModal({ item, onClose }: Props) {
    if (!item) return null;

    const start = new Date(item.start_date).toLocaleDateString();
    const end = new Date(item.end_date).toLocaleDateString();

    return (
        <ModalWrapper onClose={onClose}>
            <div className={styles.modal}>
                <button className={styles.closeIcon} onClick={onClose}>×</button>

                <h3 className={styles.heading}>Информация о пользовательской подписке</h3>

                <p className={styles.text}>
                    <strong>ID:</strong> {item.id}
                </p>
                <p className={styles.text}>
                    <strong>Название подписки:</strong>{" "}
                    {item.subscriptions?.title || "—"}
                </p>
                <p className={styles.text}>
                    <strong>Описание:</strong>{" "}
                    {item.subscriptions?.description || "—"}
                </p>
                <p className={styles.text}>
                    <strong>Срок действия:</strong>{" "}
                    {item.subscriptions?.duration_days} дней
                </p>
                <p className={styles.text}>
                    <strong>Цена:</strong> {item.subscriptions?.price} ₽
                </p>
                <p className={styles.text}>
                    <strong>Статус:</strong>{" "}
                    {item.active ? "Активна" : "Неактивна"}
                </p>
                <p className={styles.text}>
                    <strong>Период:</strong> с {start} до {end}
                </p>

                <div className={styles.actions}>
                    <button className={styles.cancelBtn} onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
}
