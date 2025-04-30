import React from 'react'
import styles from './Contact.module.scss'
import { FiMail, FiUser, FiMessageCircle } from 'react-icons/fi'

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
                        <FiMail className={styles.icon} />
                        <input type="email" placeholder="Email" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <FiMessageCircle className={styles.icon} />
                        <textarea className={styles.writeMessage} placeholder="Ваше сообщение" required rows={5}></textarea>
                    </div>

                    <button type="submit" className={styles.submitBtn}>Отправить</button>
                </form>
            </div>
        </section>
    )
}
