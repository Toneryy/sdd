// admin-panel/frontend/src/components/AdminLayout/AdminLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import styles from './AdminLayout.module.scss';
import UserSearch from 'components/UserSearch/UserSearch';

const AdminLayout: React.FC = () => (
    <div className={styles.adminLayout}>
        <Sidebar />

        {/* внешний блок отвечает только за «смещение» вправо */}
        <div className={styles.mainContent}>
            <UserSearch />
            {/* внутренний блок даёт единый отступ для всех страниц */}
            <div className={styles.page}>
                <Outlet />
            </div>
        </div>
    </div>
);

export default AdminLayout;
