import React from 'react';
import styles from './Reviews.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const reviews = [
    {
        name: 'Ишкин Сергей',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfFoeAaHVnGSH5gAvQZtoPLK4g5B30Igt3OA&s',
        rating: 5,
        comment: 'Сервис на высоте! Ебаный свет Вася. Калибр стал летать. Всё чётко и быстро.'
    },
    {
        name: 'Марина П.',
        avatar: 'https://i.pravatar.cc/100?img=2',
        rating: 4,
        comment: 'Удобный интерфейс, всё понятно и просто. Поддержка отвечает почти мгновенно!'
    },
    {
        name: 'Игорь В.',
        avatar: 'https://i.pravatar.cc/100?img=3',
        rating: 5,
        comment: 'Крутая платформа, уже давно с вами. Постоянно совершенствуетесь — приятно видеть!'
    },
    {
        name: 'Наталья К.',
        avatar: 'https://i.pravatar.cc/100?img=4',
        rating: 4,
        comment: 'Очень выручаете, когда срочно нужно решение. Удобно, что всё в одном месте.'
    }
];

export const Reviews = () => {
    return (
        <section className={styles.reviews}>
            <div className={styles.container}>
                <h2 className={styles.title}>Отзывы наших клиентов</h2>

                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 3
                        }
                    }}
                >
                    {reviews.map((r, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.card}>
                                <div className={styles.header}>
                                    <img src={r.avatar} alt={r.name} className={styles.avatar} />
                                    <div>
                                        <h4 className={styles.name}>{r.name}</h4>
                                        <div className={styles.rating}>
                                            {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.comment}>{r.comment}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
