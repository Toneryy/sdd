import React, { useState, useRef } from "react";
import { formatRuPhone } from "../../utils/phone";
import styles from "./CallRequestModal.module.scss";

interface Props {
    onClose: () => void;
}

const CallRequestModal: React.FC<Props> = ({ onClose }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [problem, setProblem] = useState("");
    const mouseDownInside = useRef(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        mouseDownInside.current =
            (e.target as HTMLElement).closest(`.${styles.modal}`) !== null;
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        const mouseUpInside =
            (e.target as HTMLElement).closest(`.${styles.modal}`) !== null;
        if (!mouseDownInside.current && !mouseUpInside) {
            onClose();
        }
        mouseDownInside.current = false;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ name, phone, problem });
        onClose();
    };

    return (
        <div
            className={styles.overlay}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>
                    ✕
                </button>
                <h2>Заказать звонок</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(formatRuPhone(e.target.value))}
                        required
                    />
                    <textarea
                        placeholder="Опишите проблему (опционально)"
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                    />
                    <button type="submit" className={styles.submitBtn}>
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CallRequestModal;
