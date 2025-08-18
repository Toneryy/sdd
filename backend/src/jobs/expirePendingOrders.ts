// src/jobs/expirePendingOrders.ts (можно переименовать в expireStaleOrders.ts)
import { prisma } from "../config/prisma";
import { logKeyEvents } from "../utils/keyEvents";

const RESERVE_TTL_MS = Number(process.env.RESERVE_TTL_MS ?? 5 * 60 * 1000);

export async function expirePendingOrders(): Promise<number> {
  const cutoff = new Date(Date.now() - RESERVE_TTL_MS * 2);

  // истекаем и pending, и awaiting_payment
  const rows = await prisma.$queryRaw<Array<{ id: string }>>`
    WITH upd AS (
      UPDATE orders
      SET status = 'expired', updated_at = now()
      WHERE status IN ('pending', 'awaiting_payment')
        AND created_at < ${cutoff}
      RETURNING id
    )
    SELECT id FROM upd
  `;

  if (rows.length) {
    const ids = rows.map((r) => r.id);

    // Снимем резервы немедленно для этих заказов (не ждём отдельной джобы)
    await prisma.product_keys.updateMany({
      where: { reserved_by_order_id: { in: ids } },
      data: { reserved_by_order_id: null, reserved_until: null },
    });

    // аудит событий
    await logKeyEvents(
      prisma,
      ids.map((id) => ({ event: "order_expired", order_id: id }))
    );
  }

  return rows.length;
}
