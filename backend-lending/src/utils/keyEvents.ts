// src/utils/keyEvents.ts
import type { Prisma, PrismaClient } from "@prisma/client";

type TxLike = Prisma.TransactionClient | PrismaClient;

export async function logKeyEvents(
  tx: TxLike,
  rows: Array<{
    event:
      | "reserved"
      | "reservation_released"
      | "paid"
      | "alias_created"
      | "activated"
      | "alias_deactivated"
      | "refunded"
      | "order_expired";
    product_key_id?: string | null;
    alias_id?: string | null;
    order_id?: string | null;
    order_item_id?: string | null;
    details?: any;
  }>
) {
  if (!rows.length) return;
  await (tx as any).key_events.createMany({
    data: rows.map((r) => ({
      event: r.event as any,
      product_key_id: r.product_key_id ?? null,
      alias_id: r.alias_id ?? null,
      order_id: r.order_id ?? null,
      order_item_id: r.order_item_id ?? null,
      details: r.details ?? null,
    })),
    skipDuplicates: true,
  });
}
