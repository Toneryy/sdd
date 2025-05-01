import React from 'react'
import InputMask from 'react-input-mask'
import styles from './Contact.module.scss'
import { FiUser, FiPhone } from 'react-icons/fi'

export const Contact = () => {
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
                        <input type="text" placeholder="Ваше имя" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <FiPhone className={styles.icon} />
                        <InputMask
                            mask="+7 (999) 999-99-99"
                            alwaysShowMask={false}
                            maskChar={null}
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
