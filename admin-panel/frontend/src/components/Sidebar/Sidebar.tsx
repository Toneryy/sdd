// /src/components/Sidebar/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiPackage, FiUsers, FiTag, FiUsers as FiUserIcon, FiEdit, FiDatabase } from 'react-icons/fi';
import styles from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    return (
        <div className={`${styles.sidebar} ${className}`}>
            <h2 className={styles.title}>Админ-Панель</h2>
            <ul>
                <li>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        <FiHome className={styles.icon} />
                        Главная
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/products" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        <FiPackage className={styles.icon} />
                        Товары
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/users" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        <FiUsers className={styles.icon} />
                        Пользователи
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/promocodes" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        <FiTag className={styles.icon} />
                        Акции
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/clients" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        <FiUserIcon className={styles.icon} />
                        Клиенты
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/landing" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        <FiEdit className={styles.icon} />
                        Редактор
                    </NavLink>
                </li>
                {/* Новый раздел для Баз данных */}
                <li>
                    <NavLink to="/admin/databases" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        <FiDatabase className={styles.icon} />
                        Базы данных
                    </NavLink>
                    {/* Здесь теперь не будет подсписков с данными, они будут только в Databases */}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
