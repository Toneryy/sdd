import React, { useState } from 'react'
import InputMask from 'react-input-mask'
import styles from './Contact.module.scss'
import { FiUser, FiPhone } from 'react-icons/fi'

export const Contact = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('Text')
        const digitsOnly = pasted.replace(/\D/g, '')

        let number = digitsOnly

        if (number.length === 11 && (number.startsWith('8') || number.startsWith('7'))) {
            number = number.slice(1)
        } else if (number.length === 12 && number.startsWith('7')) {
            number = number.slice(2)
        }

        number = number.slice(0, 10)

        const formatted = number.replace(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, a, b, c, d) =>
            `+7 (${a}${b ? ') ' + b : ''}${c ? '-' + c : ''}${d ? '-' + d : ''}`
        )

        setPhone(formatted)
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
                        <InputMask
                            mask="+7 (999) 999-99-99"
                            maskChar="_"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onPaste={handlePaste}
                        >
                            {(inputProps: any) => (
                                <input
                                    {...inputProps}
                                    type="tel"
                                    placeholder="+7 (___) ___-__-__"
                                    className={styles.input}
                                    required
                                />
                            )}
                        </InputMask>
                    </div>

                    <button type="submit" className={styles.submitBtn}>Отправить запрос</button>
                </form>
            </div>
        </section>
    )
}
