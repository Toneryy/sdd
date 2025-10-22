import React from 'react'
import styles from './NewsPage.module.scss'
import NewsList from './NewsList'
import Seo from '../../Components/Seo'

const NewsPage: React.FC = () => {
    return (
        <div className={styles.newsPage}>
            <Seo title="Новости — SDD" description="Последние новости сервиса" />
            <h1 className={styles.title}>Новости</h1>
            <NewsList />
        </div>
    )
}

export default NewsPage
