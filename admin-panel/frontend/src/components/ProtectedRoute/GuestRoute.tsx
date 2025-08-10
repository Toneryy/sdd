// src/components/Permissions/GuardRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePermissions } from "../../contexts/PermissionsContext";
import { FeatureKey } from "../../config/features";

type Props = {
    /** Одна фича или несколько */
    feature: FeatureKey | FeatureKey[];
    /** Режим проверки: хотя бы одну ('any') или все ('all'). По умолчанию 'any' */
    mode?: "any" | "all";
    /** Куда редиректить при отсутствии доступа */
    fallbackPath?: string;
    children: React.ReactNode;
};

export function GuardRoute({
    feature,
    mode = "any",
    fallbackPath = "/admin",
    children,
}: Props) {
    const { loading, hasAccess } = usePermissions();
    const loc = useLocation();

    if (loading) return null;

    const features = Array.isArray(feature) ? feature : [feature];
    const allowed =
        mode === "all"
            ? features.every((f) => hasAccess(f))
            : features.some((f) => hasAccess(f));

    if (!allowed) {
        return <Navigate to={fallbackPath} replace state={{ from: loc }} />;
    }

    return <>{children}</>;
}
