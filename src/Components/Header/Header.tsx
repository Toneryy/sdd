import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import styles from './Header.module.scss'

const Header: React.FC = () => {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false)
        setIsClicked(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleMouseEnter = () => {
    if (!isClicked) setServicesOpen(true)
  }

  const handleMouseLeave = () => {
    if (!isClicked) setServicesOpen(false)
  }

  const handleToggleClick = () => {
    setServicesOpen(prev => !prev)
    setIsClicked(prev => !prev)
  }

  const tariffs = [
    'Консультация',
    'Разовое обращение',
    'Месячная подписка',
    '3-месячная подписка',
    '6-месячная подписка',
    'Годовая подписка',
    '2-года подписка',
    'Решение проблемы YouTube'
  ]
  const toggleMobile = () => setMobileOpen(prev => !prev)
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>MySite</Link>

        <nav
          className={`${styles.nav} ${mobileOpen ? styles.open : ''}`}
          onClick={e => e.stopPropagation()}
        >
          <Link to="/news" onClick={() => setMobileOpen(false)}>
            Главное меню
          </Link>

          <div
            className={styles.services}
            ref={servicesRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={styles.servicesBtn}
              onClick={handleToggleClick}
            >
              Удаленная Поддержка
            </button>

            {servicesOpen && (
              <ul className={styles.servicesMenu}>
                {tariffs.map((label, i) => {
                  const name = encodeURIComponent(label.toLowerCase().replace(/\s+/g, '-'))
                  return (
                    <li key={i}>
                      <Link
                        to={`/subscriptions/${name}`}
                        className={styles.name}
                        onClick={() => {
                          setServicesOpen(false)
                          setIsClicked(false)
                          setMobileOpen(false)
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <Link
            to="/login"
            className={`${styles.loginBtn} ${styles.mobileOnly}`}
            onClick={() => setMobileOpen(false)}
          >
            Войти
          </Link>
        </nav>

        <div className={styles.desktopButtons}>
          <button className={styles.callButton}>Заказать звонок</button>
          <Link to="/login" className={styles.loginBtn}>Войти</Link>
        </div>

        <button className={styles.burger} onClick={toggleMobile}>
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  )
}

export default Header
