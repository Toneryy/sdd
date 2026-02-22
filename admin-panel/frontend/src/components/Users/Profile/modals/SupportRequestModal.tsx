import { useState } from "react";
import styles from "../Modal.module.scss";
import ModalWrapper from "../ModalWrapper";

interface Props {
    item: {
        title: string;
        description?: string;
        status?: string;
        operator_description?: string;
        operator_id?: string | null;
    };
    staffOptions: { id: string; full_name?: string; username?: string; email?: string }[];
    onSave: (
        p: { operator_description: string; operator_id: string | null; status: string }
    ) => void;
    onClose: () => void;
}

const STATUS_OPTIONS = [
    { value: "closed", label: "Закрыто" },
    { value: "active", label: "Активно" },
    { value: "pending", label: "Ожидает ответа" },
];

export default function SupportRequestModal({
    item,
    staffOptions,
    onSave,
    onClose,
}: Props) {
    const [comment, setComment] = useState(item.operator_description || "");
    const [staffId, setStaffId] = useState(item.operator_id || "");
    const [status, setStatus] = useState(item.status || "pending");
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await onSave({
            operator_description: comment,
            operator_id: staffId || null,
            status,
        });
        setSaving(false);
    };

    return (
        <ModalWrapper onClose={onClose}>
            <div className={styles.modal}>
                <button className={styles.closeIcon} onClick={onClose}>×</button>

                <h3 className={styles.heading}>Редактирование обращения</h3>

                <p className={styles.text}>
                    <strong>Тема:</strong> {item.title}
                </p>
                {item.description && (
                    <p className={styles.text}>
                        <strong>Описание:</strong> {item.description}
                    </p>
                )}

                {/* ------ статус ------ */}
                <div className={styles.field}>
                    <label className={styles.label}>Статус</label>
                    <select
                        className={styles.select}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ------ комментарий ------ */}
                <div className={styles.field}>
                    <label className={styles.label}>Комментарий оператора</label>
                    <textarea
                        className={styles.textarea}
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Как всё прошло…"
                    />
                </div>

                {/* ------ оператор ------ */}
                <div className={styles.field}>
                    <label className={styles.label}>Оператор</label>
                    <select
                        className={styles.select}
                        value={staffId || ""}
                        onChange={(e) => setStaffId(e.target.value)}
                    >
                        <option value="">— не назначен —</option>
                        {staffOptions.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.full_name || s.username || s.email}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ------ кнопки ------ */}
                <div className={styles.actions}>
                    <button
                        className={styles.saveBtn}
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Сохраняю…" : "Сохранить"}
                    </button>
                    <button className={styles.cancelBtn} onClick={onClose}>
                        Отмена
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
}
