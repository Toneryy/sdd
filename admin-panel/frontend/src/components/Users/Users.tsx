// /src/components/Users.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Users.module.scss';

const Users: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        // Пример получения данных пользователей
        axios.get('/api/admin/users')  // Для примера, подключим API
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Ошибка при получении пользователей', error));
    }, []);

    return (
        <div className={styles.usersEditor}>
            <h1 className={styles.title}>Управление пользователями</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.active ? 'Активен' : 'Неактивен'}</td>
                            <td>
                                <button className={styles.toggleButton}>Изменить статус</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
