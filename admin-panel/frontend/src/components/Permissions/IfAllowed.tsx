import React from "react";
import { usePermissions } from "../../contexts/PermissionsContext";
import { FeatureKey } from "../../config/features";

export default function IfAllowed({
    feature,
    children,
    fallback = null,
}: {
    feature: FeatureKey;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}) {
    const { loading, hasAccess } = usePermissions();
    if (loading) return null;
    return hasAccess(feature) ? <>{children}</> : <>{fallback}</>;
}
