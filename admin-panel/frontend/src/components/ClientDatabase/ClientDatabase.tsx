// /src/components/ClientDatabase.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ClientDatabase.module.scss';

const ClientDatabase: React.FC = () => {
    const [clients, setClients] = useState<any[]>([]);

    useEffect(() => {
        // Пример получения данных о клиентах
        axios.get('/api/admin/clients')  // Для примера, подключим API
            .then((response) => setClients(response.data))
            .catch((error) => console.error('Ошибка при получении клиентов', error));
    }, []);

    return (
        <div className={styles.clientDatabase}>
            <h1 className={styles.title}>База данных клиентов</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Покупки</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.username}</td>
                            <td>{client.email}</td>
                            <td>{client.purchases.length}</td>
                            <td>
                                <button className={styles.viewButton}>Просмотр</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientDatabase;
