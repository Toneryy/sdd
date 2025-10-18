import { releaseExpiredReservations } from "./releaseExpiredReservations";
import { deactivateStaleAliases } from "./deactivateStaleAliases";
import {
  updateProductTotalsOnce,
  scheduleProductTotals,
} from "./updateProductTotals";
import { expirePendingOrders } from "./expirePendingOrders";

export async function runAllJobs() {
  const released = await releaseExpiredReservations();
  const deactivated = await deactivateStaleAliases();
  const expired = await expirePendingOrders();
  const totals = await updateProductTotalsOnce();

  return {
    releasedReservations: released,
    deactivatedAliases: deactivated,
    expiredOrders: expired,
    productTotalsUpdated: totals,
  };
}

export function startSchedulers() {
  if (process.env.JOBS_DISABLED === "1") {
    console.log("[jobs] schedulers disabled by env");
    return;
  }
  const cron = require("node-cron") as typeof import("node-cron");

  cron.schedule("*/1 * * * *", async () => {
    try {
      const c1 = await releaseExpiredReservations();
      const c2 = await expirePendingOrders();
      if (c1 > 0) console.log(`[jobs] released reservations: ${c1}`);
      if (c2 > 0) console.log(`[jobs] expired pending orders: ${c2}`);
    } catch (e) {
      console.error("[jobs] minute jobs error:", e);
    }
  });

  cron.schedule("15 3 * * *", async () => {
    try {
      const c = await deactivateStaleAliases();
      if (c > 0) console.log(`[jobs] deactivated aliases: ${c}`);
    } catch (e) {
      console.error("[jobs] deactivateStaleAliases error:", e);
    }
  });

  scheduleProductTotals();
  console.log("[jobs] schedulers started");
}
