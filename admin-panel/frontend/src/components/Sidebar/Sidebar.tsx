import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiUsers,
  FiTag,
  FiUser as FiUserIcon,
  FiEdit,
  FiDatabase,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <div className={`${styles.sidebar} ${className}`}>
      <h2 className={styles.title}>Админ-Панель</h2>
      <ul>
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <FiHome className={styles.icon} />
            Главная
          </NavLink>
        </li>

        <li>
          <div
            className={styles.link}
            onClick={() => setProductsOpen(!productsOpen)}
            style={{ cursor: "pointer" }}
          >
            <FiPackage className={styles.icon} />
            Товары
            {productsOpen ? (
              <FiChevronDown style={{ marginLeft: "auto" }} />
            ) : (
              <FiChevronRight style={{ marginLeft: "auto" }} />
            )}
          </div>
          {productsOpen && (
            <ul className={styles.submenu}>
              <li>
                <NavLink to="/admin/keys" className={styles.link}>
                  Связь ключей
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/key-check" className={styles.link}>
                  Проверка ключа
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/products" className={styles.link}>
                  Редактор
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <FiUsers className={styles.icon} />
            Пользователи
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/promocodes"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <FiTag className={styles.icon} />
            Акции
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/clients"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <FiUserIcon className={styles.icon} />
            Клиенты
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/landing"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <FiEdit className={styles.icon} />
            Редактор
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/databases"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <FiDatabase className={styles.icon} />
            Базы данных
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
