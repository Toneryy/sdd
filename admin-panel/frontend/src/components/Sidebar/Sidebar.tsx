// src/components/Sidebar/Sidebar.tsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  FiLogOut,
  FiTool,
} from "react-icons/fi";
import styles from "./Sidebar.module.scss";
import { notifyOnce } from "utils/notifyOnce";
import { toast } from "react-toastify";
import { useAuth } from "contexts/AuthContext";
import { usePermissions } from "contexts/PermissionsContext"; // ← добавили

const TOAST_ID_LOGOUT = "logout-success";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const { logout } = useAuth();
  const { loading, hasAccess } = usePermissions(); // ← используем hasAccess
  const navigate = useNavigate();

  const canSeeAnyServiceItem =
    hasAccess("SERVICE_BACKUP") ||
    hasAccess("SERVICE_REGISTER") ||
    hasAccess("SERVICE_STAFF_MEMBERS") ||
    hasAccess("SERVICE_STAFF_RIGHTS");

  const canSeeServiceSection = hasAccess("SERVICE_SECTION") && canSeeAnyServiceItem;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      notifyOnce(toast.info, "Вы вышли из системы", TOAST_ID_LOGOUT);
      navigate("/login", { replace: true });
    } catch {
      toast.error("Не удалось выйти. Попробуйте ещё раз.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (loading) return null; // можно показывать скелетон, если хочется

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

        {/* Товары / ключи — показываем, если доступна хотя бы одна фича этого блока */}
        {(hasAccess("PRODUCTS_PAGE") ||
          hasAccess("KEYS_LINKING") ||
          hasAccess("KEY_CHECK")) && (
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
                  {hasAccess("KEYS_LINKING") && (
                    <li>
                      <NavLink to="/admin/keys" className={styles.link}>
                        Связь кодов
                      </NavLink>
                    </li>
                  )}
                  {hasAccess("KEY_CHECK") && (
                    <li>
                      <NavLink to="/admin/key-check" className={styles.link}>
                        Проверка ключа
                      </NavLink>
                    </li>
                  )}
                  {hasAccess("PRODUCTS_PAGE") && (
                    <li>
                      <NavLink to="/admin/products" className={styles.link}>
                        Редактор
                      </NavLink>
                    </li>
                  )}
                </ul>
              )}
            </li>
          )}

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

        {hasAccess("PROMOCODES_PAGE") && (
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
        )}

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

        {(hasAccess("POSTS_EDITOR") || hasAccess("DRAFTS_PAGE")) && (
          <li>
            <div
              className={styles.link}
              onClick={() => setEditorOpen(!editorOpen)}
              style={{ cursor: "pointer" }}
            >
              <FiEdit className={styles.icon} />
              Редактор
              {editorOpen ? (
                <FiChevronDown style={{ marginLeft: "auto" }} />
              ) : (
                <FiChevronRight style={{ marginLeft: "auto" }} />
              )}
            </div>
            {editorOpen && (
              <ul className={styles.submenu}>
                {hasAccess("POSTS_EDITOR") && (
                  <li>
                    <NavLink
                      to="/admin/posts"
                      className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                      }
                    >
                      Посты
                    </NavLink>
                  </li>
                )}
                {hasAccess("DRAFTS_PAGE") && (
                  <li>
                    <NavLink
                      to="/admin/drafts"
                      className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.active}` : styles.link
                      }
                    >
                      Черновики
                    </NavLink>
                  </li>
                )}
              </ul>
            )}
          </li>
        )}

        {hasAccess("DATABASES_PAGE") && (
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
        )}

        {canSeeServiceSection && (
          <li>
            <div
              className={styles.link}
              onClick={() => setServiceOpen(!serviceOpen)}
              style={{ cursor: "pointer" }}
            >
              <FiTool className={styles.icon} />
              Служебные
              {serviceOpen ? <FiChevronDown style={{ marginLeft: "auto" }} /> : <FiChevronRight style={{ marginLeft: "auto" }} />}
            </div>

            {serviceOpen && (
              <ul className={styles.submenu}>
                {hasAccess("SERVICE_BACKUP") && (
                  <li>
                    <NavLink to="/admin/backup" className={styles.link}>
                      Резервное копирование
                    </NavLink>
                  </li>
                )}
                {hasAccess("SERVICE_REGISTER") && (
                  <li>
                    <NavLink to="/admin/register" className={styles.link}>
                      Регистрация
                    </NavLink>
                  </li>
                )}
                {hasAccess("SERVICE_STAFF_MEMBERS") && (
                  <li>
                    <NavLink to="/admin/staff-members" className={styles.link}>
                      Персонал
                    </NavLink>
                  </li>
                )}
                {hasAccess("SERVICE_STAFF_RIGHTS") && (
                  <li>
                    <NavLink to="/admin/staff-rights" className={styles.link}>
                      Права доступа
                    </NavLink>
                  </li>
                )}
              </ul>
            )}
          </li>
        )}
      </ul>

      <div className={styles.logout} onClick={handleLogout}>
        <FiLogOut className={styles.iconLogout} />
        Выйти
      </div>
    </div>
  );
};

export default Sidebar;
