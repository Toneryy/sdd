// src/jobs/updateProductTotals.ts
import { prisma } from "../config/prisma";

/**
 * Пересчитывает products.total_amount по свободным ключам:
 * used=false И (reserved_until IS NULL OR reserved_until < now())
 * Возвращает количество затронутых строк (ориентировочно).
 */
export async function updateProductTotalsOnce(): Promise<number> {
  // Обновляем те продукты, у которых есть свободные ключи
  const updated = await prisma.$executeRawUnsafe(`
    UPDATE products p
    SET total_amount = COALESCE(pk.free_count, 0)
    FROM (
      SELECT product_id, COUNT(*)::int AS free_count
      FROM product_keys
      WHERE used = false
        AND (reserved_until IS NULL OR reserved_until < NOW())
      GROUP BY product_id
    ) pk
    WHERE p.id = pk.product_id
  `);

  // Обнуляем те продукты, у которых свободных ключей нет (и чтобы не перетирали зря)
  const zeroed = await prisma.$executeRawUnsafe(`
    UPDATE products p
    SET total_amount = 0
    WHERE NOT EXISTS (
      SELECT 1 FROM product_keys k
      WHERE k.product_id = p.id
        AND k.used = false
        AND (k.reserved_until IS NULL OR k.reserved_until < NOW())
    )
    AND (p.total_amount IS DISTINCT FROM 0)
  `);

  return Number(updated) + Number(zeroed);
}

/** Планировщик: считаем часто и дёшево */
export function scheduleProductTotals(): void {
  const cron = require("node-cron") as typeof import("node-cron");

  // Каждую минуту. Можно поставить */30 * * * * * (каждые 30 сек), если нужно чаще.
  cron.schedule("*/1 * * * *", async () => {
    try {
      const n = await updateProductTotalsOnce();
      if (n > 0) console.log(`[jobs] product totals updated: ${n}`);
    } catch (e) {
      console.error("[jobs] updateProductTotalsOnce error:", e);
    }
  });

  // Первый запуск сразу при старте
  updateProductTotalsOnce().catch(console.error);
}
