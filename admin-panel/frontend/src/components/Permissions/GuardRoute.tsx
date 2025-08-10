import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePermissions } from "../../contexts/PermissionsContext";
import { FeatureKey } from "../../config/features";

export function GuardRoute({
    feature,
    children,
}: {
    feature: FeatureKey;
    children: React.ReactNode;
}) {
    const { loading, hasAccess } = usePermissions();
    const loc = useLocation();
    if (loading) return null;
    if (!hasAccess(feature)) {
        return <Navigate to="/admin" replace state={{ from: loc }} />;
    }
    return <>{children}</>;
}
