import React, { useState } from 'react'
import { formatRuPhone, normalizeRuPhoneToE164 } from '../../utils/phone'
import styles from './Contact.module.scss'
import { FiUser, FiPhone } from 'react-icons/fi'

export const Contact = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

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
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            className={styles.input}
                            value={phone}
                            onChange={(e) => setPhone(formatRuPhone(e.target.value))}
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
