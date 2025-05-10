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
                        onPaste={(e) => {
                            e.preventDefault()
                            const pasted = e.clipboardData.getData('Text')
                            const digitsOnly = pasted.replace(/\D/g, '')

                            let number = digitsOnly

                            if (number.length === 11 && (number.startsWith('8') || number.startsWith('7'))) {
                                number = number.slice(1) // отрезаем первую 8/7
                            } else if (number.length === 12 && number.startsWith('7')) {
                                number = number.slice(2) // отрезаем +7
                            }

                            // Ограничим до 10 цифр (типичный российский номер без кода страны)
                            number = number.slice(0, 10)

                            // Превращаем обратно в маску +7 (___) ___-__-__
                            const formatted = number.replace(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, a, b, c, d) =>
                                `+7 (${a}${b ? ') ' + b : ''}${c ? '-' + c : ''}${d ? '-' + d : ''}`
                            )

                            setPhone(formatted)
                        }}
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
