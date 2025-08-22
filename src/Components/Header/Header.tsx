import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiShoppingCart,
  FiHome,
  FiGrid,
  FiPhoneCall,
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { loadFavorites } from 'utils/favoritesStorage';
import CallRequestModal from './CallRequestModal';
import styles from './Header.module.scss';
import { AuthContext } from 'context/AuthContext';

const Header: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const [favCount, setFavCount] = useState(0);
  const navigate = useNavigate();

  const isAuthenticated = Boolean(localStorage.getItem('token'));

  const updateFavCount = () => {
    const raw = loadFavorites();
    const uniqueIds = Array.from(new Set(raw.map((p: any) => p.id)));
    setFavCount(uniqueIds.length);
  };

  useEffect(() => {
    updateFavCount();
    window.addEventListener('favoritesChanged', updateFavCount);

    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('favoritesChanged', updateFavCount);
    };
  }, []);

  const toggleUserMenu = () => setUserMenuOpen(prev => !prev);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/login');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* ЛОГО слева */}
          <NavLink to="/" className={styles.logo}>
            bd-project
          </NavLink>

          {/* Десктопная навигация по центру */}
          <nav className={styles.navDesktop}>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
              Главное меню
            </NavLink>
            <NavLink to="/subscriptions" className={({ isActive }) => (isActive ? styles.active : '')}>
              Услуги
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? styles.active : '')}>
              Магазин
            </NavLink>
          </nav>

          {/* СПРАВА: один ряд с единым gap: звонок, избранное, корзина, профиль/войти */}
          <div className={styles.right}>
            <button
              className={styles.callButton}
              onClick={() => setCallModalOpen(true)}
              title="Заказать звонок"
              aria-label="Заказать звонок"
            >
              <FiPhoneCall />
              <span>Заказать звонок</span>
            </button>

            {/* ДЕСКТОП: избранное и корзина */}
            <Link
              to="/favorites"
              className={`${styles.iconButton} ${styles.favoriteButton}`}
              title="Избранное"
              aria-label="Избранное"
            >
              <FaHeart />
              {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
            </Link>

            <Link
              to="/cart"
              className={styles.iconButton}
              title="Корзина"
              aria-label="Корзина"
            >
              <FiShoppingCart />
            </Link>

            {/* Войти (текст ВСЕГДА виден) или профиль */}
            {!isAuthenticated ? (
              <Link to="/login" className={styles.loginBtn}>
                Войти
              </Link>
            ) : (
              <div className={styles.user} ref={userRef}>
                <button
                  className={styles.userIcon}
                  onClick={toggleUserMenu}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  aria-label="Меню профиля"
                >
                  <FiUser />
                </button>
                {userMenuOpen && (
                  <div className={styles.userDropdown} role="menu">
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)} role="menuitem">
                      Личный кабинет
                    </Link>
                    <button onClick={handleLogout} role="menuitem">Выйти</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* НИЖНЯЯ НАВИГАЦИЯ (мобайл/планшет) */}
      <nav className={styles.bottomBar} aria-label="Нижняя навигация">
        <NavLink to="/" className={({ isActive }) => `${styles.bottomItem} ${isActive ? styles.active : ''}`}>
          <FiHome />
          <span>Главная</span>
        </NavLink>

        <NavLink to="/subscriptions" className={({ isActive }) => `${styles.bottomItem} ${isActive ? styles.active : ''}`}>
          <FiGrid />
          <span>Услуги</span>
        </NavLink>

        <NavLink to="/shop" className={({ isActive }) => `${styles.bottomItem} ${isActive ? styles.active : ''}`}>
          <FiGrid />
          <span>Магазин</span>
        </NavLink>

        <NavLink to="/favorites" className={({ isActive }) => `${styles.bottomItem} ${isActive ? styles.active : ''}`}>
          <FaHeart />
          {favCount > 0 && <span className={styles.smallBadge}>{favCount}</span>}
          <span>Избранное</span>
        </NavLink>

        <NavLink to="/cart" className={({ isActive }) => `${styles.bottomItem} ${isActive ? styles.active : ''}`}>
          <FiShoppingCart />
          <span>Корзина</span>
        </NavLink>
      </nav>

      {callModalOpen && <CallRequestModal onClose={() => setCallModalOpen(false)} />}
    </>
  );
};

export default Header;
