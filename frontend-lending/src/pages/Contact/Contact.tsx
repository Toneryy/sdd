import React, { useState, useRef } from 'react'
import { formatRuPhone, normalizeRuPhoneToE164 } from '../../utils/phone'
import styles from './Contact.module.scss'
import { FiUser, FiPhone } from 'react-icons/fi'

export const Contact = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const phoneInputRef = useRef<HTMLInputElement>(null)

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target
        const cursorPosition = input.selectionStart || 0
        const oldValue = phone
        const newValue = formatRuPhone(input.value)
        
        setPhone(newValue)
        
        // Восстанавливаем позицию курсора после форматирования
        setTimeout(() => {
            if (phoneInputRef.current) {
                let newCursorPosition = cursorPosition
                
                // Если удаляли символ (новая строка короче)
                if (newValue.length < oldValue.length) {
                    // При удалении курсор остается на месте или сдвигается назад
                    const deletedChars = oldValue.length - newValue.length
                    newCursorPosition = Math.max(0, cursorPosition - deletedChars)
                } else {
                    // При добавлении сдвигаем курсор вперед на количество добавленных символов
                    const addedChars = newValue.length - oldValue.length
                    newCursorPosition = cursorPosition + addedChars
                }
                
                // Корректируем позицию, чтобы курсор не оказался в середине форматирующих символов
                if (newCursorPosition > newValue.length) {
                    newCursorPosition = newValue.length
                }
                
                phoneInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition)
            }
        }, 0)
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('Text')
        setPhone(formatRuPhone(pasted))
    }

    return (
        <section className={styles.contact}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h2 className={styles.title}>Свяжитесь с нами</h2>
                    <p className={styles.subtitle}>
                        У вас есть вопрос, предложение или хотите начать сотрудничество?
                        Напишите нам — мы ответим как можно скорее.
                    </p>
                </div>

                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <FiUser className={styles.icon} />
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <FiPhone className={styles.icon} />
                        <input
                            ref={phoneInputRef}
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            className={styles.input}
                            value={phone}
                            onChange={handlePhoneChange}
                            onPaste={handlePaste}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>Отправить запрос</button>
                </form>
            </div>
        </section>
    )
}
