// src/components/Services/Services.tsx
import React, { useEffect, useState, useMemo } from 'react'
import { fetchSubscriptions, Subscription } from 'api/subscriptions'
import { useFavoritesStore } from '../../store/favorites'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { FiClock, FiZap, FiHeart, FiSearch, FiX } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import styles from './Services.module.scss'
import Skeleton from '../Skeleton/Skeleton'

const declensionDay = (n: number): string => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 14) return 'дней';
    if (mod10 === 1) return 'день';
    if (mod10 >= 2 && mod10 <= 4) return 'дня';
    return 'дней';
};

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc';

const Services: React.FC = () => {
    const [services, setServices] = useState<Subscription[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [sortBy, setSortBy] = useState<SortOption>('default')
    const [displayCount, setDisplayCount] = useState(20)
    
    const favIds = useFavoritesStore(s => s.ids)
    const toggleFavorite = useFavoritesStore(s => s.toggle)

    useEffect(() => {
        let mounted = true
        
        const loadServices = async () => {
            try {
                const res = await fetchSubscriptions()
                if (mounted) {
                    setServices(res.data)
                }
            } catch (err) {
                console.error(err)
                if (mounted) {
                    toast.error('Не удалось загрузить услуги')
                }
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }
        
        loadServices()
        
        return () => {
            mounted = false
        }
    }, [])
    
    const handleToggleFavorite = (e: React.MouseEvent, serviceId: string) => {
        e.preventDefault()
        e.stopPropagation()
        const isFav = favIds.includes(serviceId)
        toggleFavorite(serviceId)
        toast.info(
            isFav ? 'Удалено из избранного' : 'Добавлено в избранное',
            { toastId: `fav-${serviceId}` }
        )
    }

    const handleClearFilters = () => {
        setSearchQuery('')
        setMinPrice('')
        setMaxPrice('')
        setSortBy('default')
        setDisplayCount(20)
    }

    // Фильтрация и сортировка
    const filteredAndSortedServices = useMemo(() => {
        let result = [...services]

        // Поиск
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            result = result.filter(svc => 
                svc.title.toLowerCase().includes(query) ||
                (svc.description && svc.description.toLowerCase().includes(query))
            )
        }

        // Фильтр по цене
        if (minPrice) {
            const min = parseFloat(minPrice)
            result = result.filter(svc => Number(svc.price) >= min)
        }
        if (maxPrice) {
            const max = parseFloat(maxPrice)
            result = result.filter(svc => Number(svc.price) <= max)
        }

        // Сортировка
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => Number(a.price) - Number(b.price))
                break
            case 'price-desc':
                result.sort((a, b) => Number(b.price) - Number(a.price))
                break
            case 'duration-asc':
                result.sort((a, b) => a.duration_days - b.duration_days)
                break
            case 'duration-desc':
                result.sort((a, b) => b.duration_days - a.duration_days)
                break
            default:
                // default - без сортировки
                break
        }

        return result
    }, [services, searchQuery, minPrice, maxPrice, sortBy])

    const displayedServices = filteredAndSortedServices.slice(0, displayCount)
    const hasMore = filteredAndSortedServices.length > displayCount
    const activeFiltersCount = [searchQuery, minPrice, maxPrice].filter(Boolean).length + (sortBy !== 'default' ? 1 : 0)

    if (loading) {
        return (
            <>
                <Helmet>
                    <title>Наши услуги - bd-project</title>
                    <meta name="description" content="Выберите подходящую услугу IT-поддержки" />
                </Helmet>
                <section className={styles.services}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>Наши услуги</h1>
                            <p className={styles.subtitle}>Выберите подходящий тариф для решения ваших задач</p>
                        </div>

                        <div className={styles.filtersBar}>
                            <div className={styles.skeletonSearchBar} />
                        </div>

                        <div className={styles.grid}>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className={styles.skeletonCard}>
                                    <div className={styles.skeletonImage} />
                                    <div className={styles.skeletonContent}>
                                        <Skeleton width="70%" height={24} />
                                        <Skeleton width="50%" height={20} />
                                        <Skeleton width="40%" height={16} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>Наши услуги - bd-project</title>
                <meta name="description" content="Выберите подходящую услугу IT-поддержки" />
            </Helmet>
            <section className={styles.services}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Наши услуги</h1>
                        <p className={styles.subtitle}>Выберите подходящий тариф для решения ваших задач</p>
                    </div>

                    {/* Панель фильтров и поиска */}
                    <div className={styles.filtersBar}>
                        {/* Поиск */}
                        <div className={styles.searchBox}>
                            <FiSearch className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Поиск услуг..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className={styles.clearSearchBtn}
                                    aria-label="Очистить поиск"
                                >
                                    <FiX />
                                </button>
                            )}
                        </div>

                        {/* Фильтры по цене */}
                        <div className={styles.priceFilters}>
                            <input
                                type="number"
                                placeholder="От"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className={styles.priceInput}
                                min="0"
                            />
                            <span className={styles.priceSeparator}>—</span>
                            <input
                                type="number"
                                placeholder="До"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className={styles.priceInput}
                                min="0"
                            />
                        </div>

                        {/* Сортировка */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className={styles.sortSelect}
                        >
                            <option value="default">По умолчанию</option>
                            <option value="price-asc">Цена: по возрастанию</option>
                            <option value="price-desc">Цена: по убыванию</option>
                            <option value="duration-asc">Длительность: по возрастанию</option>
                            <option value="duration-desc">Длительность: по убыванию</option>
                        </select>

                        {/* Кнопка сброса фильтров */}
                        {activeFiltersCount > 0 && (
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className={styles.clearFiltersBtn}
                            >
                                Сбросить ({activeFiltersCount})
                            </button>
                        )}
                    </div>

                    {/* Результаты */}
                    <div className={styles.resultsInfo}>
                        Найдено услуг: <strong>{filteredAndSortedServices.length}</strong>
                    </div>

                    {filteredAndSortedServices.length === 0 ? (
                        <div className={styles.empty}>
                            <div className={styles.emptyIcon}>🔍</div>
                            <h3>Ничего не найдено</h3>
                            <p>Попробуйте изменить параметры поиска</p>
                            {activeFiltersCount > 0 && (
                                <button onClick={handleClearFilters} className={styles.emptyButton}>
                                    Сбросить фильтры
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className={styles.grid}>
                                {displayedServices.map(svc => {
                                    const isFavorite = favIds.includes(svc.id)
                                    return (
                                    <Link to={`/subscriptions/${svc.id}`} key={svc.id} className={styles.card}>
                                        <button
                                            className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
                                            onClick={(e) => handleToggleFavorite(e, svc.id)}
                                            aria-label="Добавить в избранное"
                                        >
                                            {isFavorite ? <FaHeart /> : <FiHeart />}
                                        </button>
                                        
                                        <div className={styles.imageWrapper}>
                                            {svc.image ? (
                                                <img
                                                    src={svc.image}
                                                    alt={svc.title}
                                                    className={styles.image}
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className={styles.placeholderImage}>
                                                    <FiZap />
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.cardContent}>
                                            <h3 className={styles.cardTitle}>{svc.title}</h3>
                                            
                                            {svc.description && (
                                                <p className={styles.cardDescription}>
                                                    {svc.description.length > 100 
                                                        ? `${svc.description.substring(0, 100)}...` 
                                                        : svc.description}
                                                </p>
                                            )}

                                            <div className={styles.cardFooter}>
                                                {svc.duration_days > 0 && (
                                                    <div className={styles.duration}>
                                                        <FiClock />
                                                        <span>{svc.duration_days} {declensionDay(svc.duration_days)}</span>
                                                    </div>
                                                )}
                                                <div className={styles.cardPrice}>
                                                    {Number(svc.price) === 0 ? (
                                                        <span className={styles.priceFree}>Бесплатно</span>
                                                    ) : (
                                                        <>
                                                            <span className={styles.priceValue}>{Number(svc.price).toLocaleString()}</span>
                                                            <span className={styles.priceCurrency}>₽</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className={styles.viewButton}>
                                                <span>Подробнее</span>
                                                <FiZap />
                                            </div>
                                        </div>
                                    </Link>
                                )})}
                            </div>

                            {/* Кнопка "Показать еще" */}
                            {hasMore && (
                                <div className={styles.loadMoreContainer}>
                                    <button
                                        onClick={() => setDisplayCount(prev => prev + 20)}
                                        className={styles.loadMoreBtn}
                                    >
                                        Показать еще
                                        <span className={styles.loadMoreCount}>
                                            ({filteredAndSortedServices.length - displayCount} из {filteredAndSortedServices.length})
                                        </span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    )
}

export default Services
