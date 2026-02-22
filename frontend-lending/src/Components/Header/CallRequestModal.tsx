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
    const phoneInputRef = useRef<HTMLInputElement>(null);

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

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const cursorPosition = input.selectionStart || 0;
        const oldValue = phone;
        const newValue = formatRuPhone(input.value);
        
        setPhone(newValue);
        
        // Восстанавливаем позицию курсора
        setTimeout(() => {
            if (phoneInputRef.current) {
                let newCursorPosition = cursorPosition;
                
                if (newValue.length < oldValue.length) {
                    const deletedChars = oldValue.length - newValue.length;
                    newCursorPosition = Math.max(0, cursorPosition - deletedChars);
                } else {
                    const addedChars = newValue.length - oldValue.length;
                    newCursorPosition = cursorPosition + addedChars;
                }
                
                if (newCursorPosition > newValue.length) {
                    newCursorPosition = newValue.length;
                }
                
                phoneInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
            }
        }, 0);
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
                        ref={phoneInputRef}
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={handlePhoneChange}
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
