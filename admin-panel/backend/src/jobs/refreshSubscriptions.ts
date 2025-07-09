// backend/src/jobs/refreshSubscriptions.ts
import cron from "node-cron";
import { prisma } from "../config/prisma";

/**
 * Один запуск: пометить просроченные подписки, активировать "будущие".
 * Возвращает кол-во обновлённых строк.
 */
export async function refreshSubscriptionsOnce(): Promise<number> {
  // ❶ деактивируем просроченные
  const expired = await prisma.user_subscriptions.updateMany({
    where: { end_date: { lt: new Date() }, active: true },
    data: { active: false },
  });

  // ❷ активируем те, что снова стали актуальны (редко, но логично)
  const renewed = await prisma.user_subscriptions.updateMany({
    where: { end_date: { gte: new Date() }, active: false },
    data: { active: true },
  });

  return expired.count + renewed.count;
}

/** Планируем задачу cron-ом */
export function scheduleSubscriptionRefresh(): void {
  // *  0   *   *   *   *   =  в 0-й минуте каждого часа
  // -  -   -   -   -   -
  // |  |   |   |   |   |
  // |  |   |   |   |   └─ день недели (0-6 или SUN-SAT)
  // |  |   |   |   └──── месяц (1-12)
  // |  |   |   └──────── день месяца (1-31)
  // |  |   └──────────── час (0-23)
  // |  └──────────────── минута (0-59)
  // └─────────────────── секунда (опционально — не используем)
  cron.schedule("0 * * * *", async () => {
    try {
      const changed = await refreshSubscriptionsOnce();
      console.log(`[subscriptions-job] updated rows: ${changed}`);
    } catch (e) {
      console.error("[subscriptions-job] error:", e);
    }
  });

  // первый запуск сразу при старте сервера
  refreshSubscriptionsOnce().catch(console.error);
}
