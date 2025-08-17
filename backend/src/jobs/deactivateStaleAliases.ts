// src/jobs/deactivateStaleAliases.ts
import { prisma } from "../config/prisma";
import { logKeyEvents } from "../utils/keyEvents";

export async function deactivateStaleAliases() {
  const rows = await prisma.$queryRaw<
    Array<{ id: string; product_key_id: string | null }>
  >`
    WITH upd AS (
      UPDATE keys_aliases
      SET active = false, updated_at = now()
      WHERE activated = false
        AND active = true
        AND active_days IS NOT NULL
        AND created_at + make_interval(days => active_days) < now()
      RETURNING id, product_key_id
    )
    SELECT id, product_key_id FROM upd
  `;

  if (rows.length) {
    await logKeyEvents(
      prisma,
      rows.map((r) => ({
        event: "alias_deactivated",
        alias_id: r.id,
        product_key_id: r.product_key_id ?? null,
      }))
    );
  }

  return rows.length;
}
