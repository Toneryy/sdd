import { useState } from "react";
import { lookupKey } from "../../../api/keyLookup";
import { toast } from "react-toastify";
import styles from "../Products.module.scss";

const MAX_LEN = 18;

/** Формат «xx-xxxx-xxxx-xxxx-xxxx» для строки ≤ 18 символов */
const formatKey = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, MAX_LEN); // максимум 18 цифр
  if (digits.length <= 2) return digits;

  return [
    digits.slice(0, 2),
    digits.slice(2, 6),
    digits.slice(6, 10),
    digits.slice(10, 14),
    digits.slice(14, 18),
  ]
    .filter(Boolean)
    .join("-");
};

export default function KeyLookup() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<any | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(formatKey(e.target.value));
  };

  const handleSearch = async () => {
    const raw = value.replace(/\D/g, ""); // только цифры
    if (raw.length !== MAX_LEN) {
      toast.error("Введите ровно 18 цифр");
      return;
    }
    try {
      const data = await lookupKey(raw);
      setResult(data);
    } catch (err: any) {
      setResult(null);
      toast.error(err?.response?.data?.message ?? "Не найдено");
    }
  };

  return (
    <div className={styles.productEditor}>
      <h2 className={styles.subtitle}>Проверка ключа (18 цифр)</h2>

      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="xx-xxxx-xxxx-xxxx-xxxx"
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          maxLength={23} /* 18 цифр + 4 дефиса + запас */
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Проверить
        </button>
      </div>

      {result && (
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Ключ</th> <td>{result.key_encrypted}</td>
            </tr>
            <tr>
              <th>Код</th> <td>{result.code}</td>
            </tr>
            <tr>
              <th>Товар</th> <td>{result.product ?? "—"}</td>
            </tr>
            <tr>
              <th>Статус</th>{" "}
              <td>{result.used ? "Использован" : "Свободен"}</td>
            </tr>
            <tr>
              <th>Создан</th>{" "}
              <td>{new Date(result.created_at).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Обновлён</th>
              <td>{new Date(result.updated_at).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
