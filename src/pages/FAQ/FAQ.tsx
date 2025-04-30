import React, { useState } from 'react';
import styles from './FAQ.module.scss';
import { FiChevronDown } from 'react-icons/fi';

const questions = [
    {
        question: 'Как быстро я получу ответ после отправки формы?',
        answer: 'Обычно мы отвечаем в течение 24 часов, но чаще — в течение пары часов в рабочее время.'
    },
    {
        question: 'Можно ли адаптировать решение под мой бизнес?',
        answer: 'Да, мы создаем кастомные решения, подходящие под любые задачи вашего бизнеса.'
    },
    {
        question: 'Гарантируете ли вы безопасность данных?',
        answer: 'Конечно. Мы используем современные протоколы безопасности и шифрования.'
    },
    {
        question: 'Есть ли бесплатный тестовый период?',
        answer: 'Да, вы можете протестировать наш продукт бесплатно в течение 7 дней.'
    }
];

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };

    return (
        <section className={styles.faq}>
            <div className={styles.container}>
                <h2 className={styles.title}>Часто задаваемые вопросы</h2>

                <div className={styles.accordion}>
                    {questions.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}
                            onClick={() => toggle(index)}
                        >
                            <div className={styles.question}>
                                <span>{item.question}</span>
                                <FiChevronDown className={styles.icon} />
                            </div>
                            <div className={styles.answer}>{item.answer}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
