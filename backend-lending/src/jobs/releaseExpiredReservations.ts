// src/jobs/releaseExpiredReservations.ts
import { prisma } from "../config/prisma";
import { logKeyEvents } from "../utils/keyEvents";

export async function releaseExpiredReservations(now = new Date()) {
  // 1) сначала соберём id
  const expired = await prisma.product_keys.findMany({
    where: { reserved_until: { lt: now } },
    select: { id: true },
    take: 5000, // если ключей очень много — пачкуем
  });
  if (expired.length === 0) return 0;

  const ids = expired.map((x) => x.id);

  // 2) снимаем резерв
  await prisma.product_keys.updateMany({
    where: { id: { in: ids } },
    data: { reserved_by_order_id: null, reserved_until: null },
  });

  // 3) аудит
  await logKeyEvents(
    prisma,
    ids.map((id) => ({ event: "reservation_released", product_key_id: id }))
  );

  return ids.length;
}
