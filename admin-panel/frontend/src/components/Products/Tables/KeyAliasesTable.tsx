import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getKeysAliases, deleteKeysAlias } from "../../../api/keysAliases";
import styles from "../Products.module.scss";

const PAGE_SIZE = 20;

export default function KeyAliasesTable() {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPage = async (p = 1) => {
    setLoading(true);
    try {
      const { data, pages: totalPages } = await getKeysAliases(p, PAGE_SIZE);
      setRows(data);
      setPages(totalPages);
      setPage(p);
    } catch {
      toast.error("Ошибка при получении данных");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteKeysAlias(id);
      toast.info("Код удалён");
      fetchPage(page);
    } catch {
      toast.error("Ошибка при удалении");
    }
  };

  const goPrev = () => page > 1 && fetchPage(page - 1);
  const goNext = () => page < pages && fetchPage(page + 1);

  return (
    <div className={styles.productEditor}>
      <h2 className={styles.subtitle}>Список псевдокодов</h2>

      {loading ? (
        <p>Загрузка…</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ключ (расшифр.)</th>
                <th>Код (расшифр.)</th>
                <th>Товар</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.product_keys?.key_encrypted ?? "—"}</td>
                  <td>{r.code}</td>
                  <td>{r.product_keys?.products?.name ?? "—"}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(r.id)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* пагинация */}
          <div className={styles.pagination}>
            <button onClick={goPrev} disabled={page === 1}>
              ‹
            </button>
            <span>
              {page} / {pages}
            </span>
            <button onClick={goNext} disabled={page === pages}>
              ›
            </button>
          </div>
        </>
      )}
    </div>
  );
}
