// src/routes/purchase.routes.ts
import { Router } from "express";
import { checkout, activate } from "../controllers/purchase.controller";
import {
  devCreatePayment,
  devPay,
} from "../controllers/dev-payments.controller";
import {
  checkoutLimiter,
  payLimiter,
  activateLimiter,
  refundLimiter,
} from "../middlewares/rateLimit";
import { getMyAssets, getOrderStatus } from "../controllers/orders.controller";
import { devRefund } from "../controllers/refund.controller";

const router = Router();

/**
 * PROD endpoints
 * (реальный флоу: резерв при checkout, активация по коду)
 */
router.post("/checkout", checkoutLimiter, checkout);
router.post("/activate", activateLimiter, activate);

/**
 * DEV: эмуляция платёжки
 * create-payment переводит pending -> awaiting_payment и считает amount
 * pay списывает резервы и помечает заказ как paid
 */
router.post("/dev/create-payment/:idOrNumber", payLimiter, devCreatePayment);
router.post("/dev/pay/:idOrNumber", payLimiter, devPay);

/**
 * Back-compat алиасы (можно удалить, когда фронт обновишь)
 */
router.post("/dev/checkout", checkoutLimiter, checkout);
router.post("/dev/activate", activateLimiter, activate);
// старый маршрут ожидал :orderId — прокидываем в новый обработчик
router.post("/dev/pay/:orderId", payLimiter, (req, res, next) => {
  (req.params as any).idOrNumber = req.params.orderId;
  return devPay(req, res, next);
});

/**
 * Read-only
 */
router.get("/order/:idOrNumber", getOrderStatus);
router.get("/my", getMyAssets);

/**
 * DEV: возврат (окно + без активированных alias + без подписок)
 */
router.post("/dev/refund/:idOrNumber", refundLimiter, devRefund);

export default router;
