// src/components/Users/Users.tsx
import React, { useState, useEffect } from "react";
import styles from "./Users.module.scss";
import { getUsers, addUser, updateUser, deleteUser } from "../../api/users";
import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation";
import EditModal from "./EditModal/EditModal";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "contexts/PermissionsContext";

interface User {
  id: string;
  username: string | null;
  email: string | null;
  phone: string | null;
  lastEndDate: string | null;
}

const Users: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState<any>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // Модалки для редактирования и удаления
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [currentEditItem, setCurrentEditItem] = useState<User | null>(null);
  const [currentDeleteId, setCurrentDeleteId] = useState<string | null>(null);

  const navigate = useNavigate();

  // Права
  const { loading: permsLoading, hasAccess } = usePermissions();
  const canEdit = !permsLoading && hasAccess("EDIT_MODAL");
  const canDelete = !permsLoading && hasAccess("DELETE_CONFIRMATION");
  const showActionsCol = canEdit || canDelete;

  useEffect(() => {
    getUsers()
      .then((data) => {
        setAllUsers(data);
        setUsers(data);
      })
      .catch(console.error);
  }, []);

  // Поиск по нажатию Enter или на кнопке
  const handleSearch = () => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      setUsers(allUsers);
      return;
    }

    const filtered = allUsers.filter((user) =>
      Object.values(user).some((v) =>
        v ? v.toString().toLowerCase().includes(query) : false
      )
    );
    setUsers(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value.trim()) setUsers(allUsers);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await addUser(form);
      setAllUsers((prev) => [...prev, created]);
      setUsers((prev) => [...prev, created]);
      setForm({ username: "", email: "", phone: "", password: "" });
    } catch (err) {
      console.error("Ошибка при добавлении пользователя", err);
    }
  };

  // позволяем передавать пароль в патч
  const handleEditUser = async (
    id: string,
    patch: Partial<User> & { password?: string }
  ) => {
    try {
      const old = allUsers.find((u) => u.id === id);
      const updated = await updateUser(id, patch);
      const withDate = { ...updated, lastEndDate: old?.lastEndDate ?? null };

      setAllUsers((prev) => prev.map((u) => (u.id === id ? withDate : u)));
      setUsers((prev) => prev.map((u) => (u.id === id ? withDate : u)));
    } catch (err) {
      console.error("Ошибка при обновлении", err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setAllUsers((prev) => prev.filter((u) => u.id !== id));
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.usersEditor}>
      <h1 className={styles.title}>Управление пользователями</h1>

      {/* ---- поиск ---- */}
      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Поиск по пользователям"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Поиск
        </button>
      </div>

      {/* ---- форма добавления ---- */}
      <form onSubmit={handleAddUser} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Имя пользователя"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className={styles.input}
          placeholder="Телефон"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className={styles.submitButton}>
          Добавить
        </button>
      </form>

      {/* ---- таблица ---- */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Подписка до</th>
            {showActionsCol && <th>Действия</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <span
                  className={styles.link}
                  onClick={() => navigate(String(`/admin/users/${u.id}`))}
                >
                  {u.username ?? "—"}
                </span>
              </td>
              <td>{u.email ?? "—"}</td>
              <td>{u.phone ?? "—"}</td>
              <td>
                {u.lastEndDate
                  ? new Date(u.lastEndDate).toLocaleDateString()
                  : "—"}
              </td>

              {showActionsCol && (
                <td>
                  {/* Редактировать — прячем, если бAN на EDIT_MODAL */}
                  <button
                    className={styles.editButton}
                    style={{ display: canEdit ? undefined : "none" }}
                    onClick={() => {
                      if (!canEdit) return;
                      setCurrentEditItem(u);
                      setEditModalVisible(true);
                    }}
                  >
                    Изменить данные
                  </button>

                  {/* Удалить — прячем, если бAN на DELETE_CONFIRMATION */}
                  <button
                    className={styles.deleteButton}
                    style={{ display: canDelete ? undefined : "none" }}
                    onClick={() => {
                      if (!canDelete) return;
                      setCurrentDeleteId(u.id);
                      setDeleteModalVisible(true);
                    }}
                  >
                    Удалить
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модалка редактирования — не монтируем при запрете */}
      {canEdit && (
        <EditModal
          show={editModalVisible}
          item={currentEditItem}
          onClose={() => setEditModalVisible(false)}
          onSave={(data) => {
            handleEditUser(data.id, data);
            setEditModalVisible(false);
          }}
        />
      )}

      {/* Модалка удаления — не монтируем при запрете */}
      {canDelete && (
        <DeleteConfirmation
          show={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onDelete={() => {
            if (!currentDeleteId) return;
            handleDeleteUser(currentDeleteId);
            setDeleteModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default Users;
