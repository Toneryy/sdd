// src/components/Header.tsx
import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiUser } from 'react-icons/fi'
import CallRequestModal from './CallRequestModal'
import styles from './Header.module.scss'
import { AuthContext } from 'context/AuthContext'

const Header: React.FC = () => {
  const [callModalOpen, setCallModalOpen] = useState(false)
  const { isAuth, logout } = useContext(AuthContext)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // здесь проверяем, есть ли токен
  const isAuthenticated = Boolean(localStorage.getItem('token'))

  // Закрываем оба меню при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false)
      }
      if (
        userRef.current &&
        !userRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const tariffs = [
    'Консультация',
    'Разовое обращение',
    'Месячная подписка',
    '3-месячная подписка',
    '6-месячная подписка',
    'Годовая подписка',
    '2-года подписка',
    'Решение проблемы YouTube',
  ]

  const toggleMobile = () => setMobileOpen(prev => !prev)
  const toggleServices = () => setServicesOpen(prev => !prev)
  const toggleUserMenu = () => setUserMenuOpen(prev => !prev)

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>MySite</Link>

        {/* --- Навигация --- */}
        <nav
          className={`${styles.nav} ${mobileOpen ? styles.open : ''}`}
          onClick={e => e.stopPropagation()}
        >
          <Link to="/news" onClick={() => setMobileOpen(false)}>Главное меню</Link>

          {/* Услуги */}
          <div
            className={styles.services}
            ref={servicesRef}
          >
            <button
              className={styles.servicesBtn}
              onClick={toggleServices}
            >
              Услуги
            </button>
            {servicesOpen && (
              <ul className={styles.servicesMenu}>
                {tariffs.map((label, i) => (
                  <li key={i}>
                    <Link
                      to={`/subscriptions/${encodeURIComponent(label.toLowerCase().replace(/\s+/g, '-'))}`}
                      className={styles.name}
                      onClick={() => {
                        setServicesOpen(false)
                        setMobileOpen(false)
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to="/shop">Магазин</Link>

          {/* Кнопка «Войти» для мобильного, если не авторизован */}
          {!isAuthenticated && (
            <Link
              to="/login"
              className={`${styles.loginBtn} ${styles.mobileOnly}`}
              onClick={() => setMobileOpen(false)}
            >
              Войти
            </Link>
          )}
        </nav>

        {/* --- Десктопные кнопки справа --- */}
        <div className={styles.desktopButtons}>
          <button
            className={styles.callButton}
            onClick={() => setCallModalOpen(true)}
          >
            Заказать звонок
          </button>

          {/* Если не авторизован — кнопка «Войти» */}
          {!isAuthenticated && (
            <Link to="/login" className={styles.loginBtn}>
              Войти
            </Link>
          )}

          {/* Если авторизован — иконка профиля */}
          {isAuthenticated && (
            <div className={styles.userMenu} ref={userRef}>
              <button className={styles.userIcon} onClick={toggleUserMenu}>
                <FiUser />
              </button>
              {userMenuOpen && (
                <div className={styles.userDropdown}>
                  <Link to="/profile" onClick={() => setUserMenuOpen(false)}>
                    Личный кабинет
                  </Link>
                  <button onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Бургер для мобильной навигации */}
        <button className={styles.burger} onClick={toggleMobile}>
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {callModalOpen && <CallRequestModal onClose={() => setCallModalOpen(false)} />}
    </header>
  )
}

export default Header
