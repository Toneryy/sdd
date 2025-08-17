// src/jobs/expirePendingOrders.ts
import { prisma } from "../config/prisma";
import { logKeyEvents } from "../utils/keyEvents";

const RESERVE_TTL_MS = Number(process.env.RESERVE_TTL_MS ?? 5 * 60 * 1000);

export async function expirePendingOrders(): Promise<number> {
  const cutoff = new Date(Date.now() - RESERVE_TTL_MS * 2);

  const rows = await prisma.$queryRaw<Array<{ id: string }>>`
    WITH upd AS (
      UPDATE orders
      SET status = 'expired', updated_at = now()
      WHERE status = 'pending'
        AND created_at < ${cutoff}
      RETURNING id
    )
    SELECT id FROM upd
  `;

  if (rows.length) {
    await logKeyEvents(
      prisma,
      rows.map((r) => ({
        event: "order_expired",
        order_id: r.id,
      }))
    );
  }

  return rows.length;
}
