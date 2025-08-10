import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { getMyRights, RightRecord } from "../api/staffRights";
import { FeatureKey } from "../config/features";

type PermsCtx = {
    loading: boolean;
    banned: Set<FeatureKey>;
    hasAccess: (feature: FeatureKey) => boolean;
    refresh: () => Promise<void>;
};

const Ctx = createContext<PermsCtx>({
    loading: false,
    banned: new Set(),
    hasAccess: () => true,
    refresh: async () => { },
});

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [banned, setBanned] = useState<Set<FeatureKey>>(new Set());

    const load = async () => {
        // нет юзера → чистим баны и точно снимаем loading
        if (!user) {
            setBanned(new Set());
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const rows: RightRecord[] = await getMyRights();
            // бан — записи can_access === false
            const denied = rows
                .filter(r => r.can_access === false)
                .map(r => r.component_name as FeatureKey);
            setBanned(new Set(denied));
        } catch (e) {
            // на ошибках не баним ничего (разрешаем всё по умолчанию)
            console.error("getMyRights failed:", e);
            setBanned(new Set());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let cancelled = false;
        (async () => {
            await load();
            if (cancelled) return;
        })();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]); // при смене юзера перезагружаем права

    const value = useMemo<PermsCtx>(() => ({
        loading,
        banned,
        hasAccess: (f: FeatureKey) => !banned.has(f),
        refresh: load,
    }), [loading, banned]);

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const usePermissions = () => useContext(Ctx);
