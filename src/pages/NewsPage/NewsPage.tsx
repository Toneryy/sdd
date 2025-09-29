import React from 'react'
import styles from './NewsPage.module.scss'
import NewsList from './NewsList'

const NewsPage: React.FC = () => {
    return (
        <div className={styles.newsPage}>
            <h1>Новости</h1>
            <NewsList />
        </div>
    )
}

export default NewsPage
