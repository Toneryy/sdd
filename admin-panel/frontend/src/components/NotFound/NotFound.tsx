import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { notifyOnce } from "utils/notifyOnce";
import styles from "./NotFound.module.scss";

const TOAST_ID_404 = "route-404";

const NotFound: React.FC<{ withinAdmin?: boolean }> = ({ withinAdmin = false }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        notifyOnce(
            toast.warn,
            `Страницы «${pathname}» не существует`,
            TOAST_ID_404,
            { autoClose: 3000 }
        );
    }, [pathname]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>404 — страницы нет</h2>
            <p className={styles.text}>
                Маршрут <code className={styles.code}>{pathname}</code> не найден.
            </p>
            <div className={styles.actions}>
                {withinAdmin ? (
                    <Link to="/admin" className={styles.btn}>На главную админки</Link>
                ) : (
                    <Link to="/" className={styles.btn}>На главную</Link>
                )}
            </div>
        </div>
    );
};

export default NotFound;
