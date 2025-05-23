// src/components/Header.tsx
import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiUser, FiShoppingCart } from 'react-icons/fi'
import { loadFavorites } from 'utils/favoritesStorage'
import CallRequestModal from './CallRequestModal'
import styles from './Header.module.scss'
import { AuthContext } from 'context/AuthContext'
import { FaHeart } from 'react-icons/fa'

const Header: React.FC = () => {
  const [callModalOpen, setCallModalOpen] = useState(false)
  const { isAuth, logout } = useContext(AuthContext)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const [favCount, setFavCount] = useState(0)
  const navigate = useNavigate()

  const isAuthenticated = Boolean(localStorage.getItem('token'))

  const updateFavCount = () => {
    const raw = loadFavorites();
    const uniqueIds = Array.from(new Set(raw.map((p: any) => p.id)));
    setFavCount(uniqueIds.length);
  };

  useEffect(() => {
    updateFavCount();
    window.addEventListener('favoritesChanged', updateFavCount)
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
        <NavLink to="/" className={styles.logo} onClick={() => setMobileOpen(false)}>bd-project</NavLink>

        {/* --- Навигация --- */}
        <nav
          className={`${styles.nav} ${mobileOpen ? styles.open : ''}`}
          onClick={e => e.stopPropagation()}
        >
          <Link to="/" onClick={() => setMobileOpen(false)}>Главное меню</Link>

          {/* Услуги */}
          <div
            className={styles.services}
            ref={servicesRef}
          >
            <Link
              to="/subscriptions"
              className={styles.services}
              onClick={() => setMobileOpen(false)}
            >
              Услуги
            </Link>
          </div>

          <Link to="/shop" onClick={() => setMobileOpen(false)}>Магазин</Link>

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
          <Link to="/favorites" className={`${styles.iconButton} ${styles.favoriteButton}`}>
            <FaHeart />
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </Link>

          <Link to="/cart" className={styles.iconButton}>
            <FiShoppingCart />
            {/* {favCount > 0 && <span className={styles.badge}>{favCount}</span>} */}
          </Link>

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
