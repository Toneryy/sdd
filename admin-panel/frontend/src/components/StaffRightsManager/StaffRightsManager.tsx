// src/components/StaffRightsManager/StaffRightsManager.tsx
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { Staff, getStaffMembers } from "../../api/staff";
import {
    getRightsForStaff,
    banFeature,
    deleteRight,
    RightRecord,
} from "../../api/staffRights";
import {
    ALL_FEATURES,
    FEATURE_LABELS,
    FeatureKey,
} from "../../config/features";
import styles from "./StaffRightsManager.module.scss";

type AllowedMap = Record<FeatureKey, boolean>;
type IdMap = Partial<Record<FeatureKey, string>>;

// хелпер: “всё разрешено”
const makeAllAllowed = (): AllowedMap =>
    Object.fromEntries(ALL_FEATURES.map((f) => [f, true])) as AllowedMap;

export default function StaffRightsManager() {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [search, setSearch] = useState("");
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

    const [allowed, setAllowed] = useState<AllowedMap>(makeAllAllowed());
    const [ids, setIds] = useState<IdMap>({});
    const [loadingList, setLoadingList] = useState(true);
    const [loadingRights, setLoadingRights] = useState(false);
    const [busy, setBusy] = useState<Set<FeatureKey>>(new Set());

    // загрузка сотрудников
    useEffect(() => {
        (async () => {
            try {
                const list = await getStaffMembers();
                setStaffList(list);
                if (list.length) setSelectedStaff(list[0]);
            } catch (e) {
                console.error(e);
                toast.error("Не удалось получить список сотрудников");
            } finally {
                setLoadingList(false);
            }
        })();
    }, []);

    // фильтр по имени/email
    const filteredStaff = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return staffList;
        return staffList.filter(
            (s) =>
                s.username.toLowerCase().includes(q) ||
                s.email.toLowerCase().includes(q)
        );
    }, [staffList, search]);

    // загрузка персональных прав выбранного сотрудника
    useEffect(() => {
        if (!selectedStaff) return;
        setLoadingRights(true);

        (async () => {
            try {
                const rows = await getRightsForStaff(selectedStaff.id);

                const nextAllowed: AllowedMap = makeAllAllowed();
                const nextIds: IdMap = {};

                // записи где can_access === false — это баны
                rows.forEach((r: RightRecord) => {
                    if (r.can_access === false) {
                        const key = r.component_name as FeatureKey;
                        if ((ALL_FEATURES as readonly string[]).includes(key)) {
                            nextAllowed[key] = false;
                            nextIds[key] = r.id;
                        }
                    }
                });

                setAllowed(nextAllowed);
                setIds(nextIds);
            } catch (e) {
                console.error(e);
                toast.error("Не удалось загрузить права");
                setAllowed(makeAllAllowed());
                setIds({});
            } finally {
                setLoadingRights(false);
            }
        })();
    }, [selectedStaff]);

    const toggleFeature = async (feature: FeatureKey) => {
        if (!selectedStaff) return;
        if (busy.has(feature)) return;

        const nextBusy = new Set(busy);
        nextBusy.add(feature);
        setBusy(nextBusy);

        const isAllowed = allowed[feature];
        try {
            if (isAllowed) {
                // было разрешено → ставим бан
                const rec = await banFeature({
                    staff_member_id: selectedStaff.id,
                    component_name: feature,
                });
                setAllowed((m) => ({ ...m, [feature]: false }));
                setIds((m) => ({ ...m, [feature]: rec.id }));
                toast.info(`Доступ к «${FEATURE_LABELS[feature]}» запрещён`);
            } else {
                // было запрещено → снимаем бан (удаляем запись)
                const id = ids[feature];
                if (id) await deleteRight(id);
                setAllowed((m) => ({ ...m, [feature]: true }));
                setIds((m) => {
                    const copy = { ...m };
                    delete copy[feature];
                    return copy;
                });
                toast.success(`Доступ к «${FEATURE_LABELS[feature]}» разрешён`);
            }
        } catch (e) {
            console.error(e);
            toast.error("Ошибка при изменении права");
        } finally {
            const cleared = new Set(nextBusy);
            cleared.delete(feature);
            setBusy(cleared);
        }
    };

    return (
        <div className={styles.page}>
            <nav className={styles.breadcrumb}>
                <NavLink to="/admin" className={styles.breadcrumbLink}>
                    Админ
                </NavLink>
                <span className={styles.breadcrumbSep}>/</span>
                <span className={styles.breadcrumbCurrent}>Права доступа</span>
            </nav>

            <div className={styles.layout}>
                {/* ЛЕВАЯ КОЛОНКА */}
                <aside className={styles.left}>
                    <div className={styles.leftHeader}>
                        <h2 className={styles.leftTitle}>Сотрудники</h2>
                        <div className={styles.searchBox}>
                            <input
                                className={styles.searchInput}
                                placeholder="Поиск по логину или email"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <ul className={styles.staffList}>
                        {loadingList && <li className={styles.skeletonItem} />}
                        {!loadingList &&
                            filteredStaff.map((s) => {
                                const active = selectedStaff?.id === s.id;
                                return (
                                    <li
                                        key={s.id}
                                        className={active ? styles.staffItemActive : styles.staffItem}
                                        onClick={() => setSelectedStaff(s)}
                                        title={`${s.username} • ${s.email}`}
                                    >
                                        <div className={styles.avatar}>
                                            {s.username.slice(0, 1).toUpperCase()}
                                        </div>
                                        <div className={styles.staffMeta}>
                                            <div className={styles.staffName}>{s.username}</div>
                                            <div className={styles.staffEmail}>{s.email}</div>
                                        </div>
                                        <span
                                            className={
                                                s.role === "administrator"
                                                    ? styles.roleBadgeAdmin
                                                    : styles.roleBadgeOperator
                                            }
                                        >
                                            {s.role === "administrator" ? "admin" : "operator"}
                                        </span>
                                    </li>
                                );
                            })}
                        {!loadingList && filteredStaff.length === 0 && (
                            <li className={styles.empty}>Ничего не найдено</li>
                        )}
                    </ul>
                </aside>

                {/* ПРАВА */}
                <section className={styles.main}>
                    <header className={styles.topbar}>
                        <h2 className={styles.title}>
                            {selectedStaff
                                ? `Права: ${selectedStaff.username}`
                                : "Выберите сотрудника"}
                        </h2>

                        {selectedStaff && (
                            <div className={styles.selectedInfo}>
                                <span className={styles.muted}>{selectedStaff.email}</span>
                                <span
                                    className={
                                        selectedStaff.role === "administrator"
                                            ? styles.rolePillAdmin
                                            : styles.rolePillOperator
                                    }
                                >
                                    {selectedStaff.role}
                                </span>
                            </div>
                        )}
                    </header>

                    {!selectedStaff && (
                        <div className={styles.placeholder}>
                            Выберите сотрудника слева, чтобы настроить его права.
                        </div>
                    )}

                    {selectedStaff && (
                        <>
                            {loadingRights && <div className={styles.overlay}>Загрузка…</div>}

                            <div className={styles.grid}>
                                {ALL_FEATURES.map((f: FeatureKey) => {
                                    const isOn = allowed[f];
                                    const isBusy = busy.has(f);
                                    return (
                                        <div key={f} className={styles.card}>
                                            <div className={styles.cardHead}>
                                                <div className={styles.cardTitle}>
                                                    {FEATURE_LABELS[f] || f}
                                                </div>
                                            </div>

                                            <div className={styles.cardBody}>
                                                <div className={styles.switchRow}>
                                                    <span className={styles.switchLabel}>
                                                        {isOn ? "Разрешено" : "Запрещено"}
                                                    </span>

                                                    <label
                                                        className={styles.switch}
                                                        title={FEATURE_LABELS[f]}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={!!isOn}
                                                            onChange={() => toggleFeature(f)}
                                                            disabled={loadingRights || isBusy}
                                                        />
                                                        <span className={styles.slider}></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}
