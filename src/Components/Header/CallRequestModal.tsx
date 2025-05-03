import React, { useState, useRef } from 'react'
import InputMask from 'react-input-mask'
import styles from './CallRequestModal.module.scss'

interface Props {
    onClose: () => void
}

const CallRequestModal: React.FC<Props> = ({ onClose }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [problem, setProblem] = useState('')
    const mouseDownInside = useRef(false)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // Проверяем, где произошёл mousedown
        mouseDownInside.current = (e.target as HTMLElement).closest(`.${styles.modal}`) !== null
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        // Если mousedown был вне модалки и mouseup тоже вне — закрываем
        const mouseUpInside = (e.target as HTMLElement).closest(`.${styles.modal}`) !== null
        if (!mouseDownInside.current && !mouseUpInside) {
            onClose()
        }
        mouseDownInside.current = false
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ name, phone, problem })
        onClose()
    }

    return (
        <div
            className={styles.overlay}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className={styles.modal}>
                <h2>Заказать звонок</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <InputMask
                        mask="+7 (999) 999-99-99"
                        maskChar="_"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    >
                        {(inputProps: any) => (
                            <input
                                {...inputProps}
                                type="tel"
                                placeholder="+7 (___) ___-__-__"
                                required
                            />
                        )}
                    </InputMask>
                    <textarea
                        placeholder="Опишите проблему (необязательно)"
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                    />
                    <button type="submit">Отправить</button>
                </form>
                <button className={styles.closeBtn} onClick={onClose}>Закрыть</button>
            </div>
        </div>
    )
}

export default CallRequestModal
