// src/routes/purchase.routes.ts
import { Router } from 'express';
import { devCheckout, devPay, devActivate } from '../controllers/purchase.controller';
import { checkoutLimiter, payLimiter, activateLimiter } from "../middlewares/rateLimit";
import { getMyAssets, getOrderStatus } from '../controllers/orders.controller';
import { generalLimiter } from "../middlewares/rateLimit";
import { devRefund } from '../controllers/refund.controller';

const router = Router();

router.post('/dev/checkout', checkoutLimiter, devCheckout);
router.post('/dev/pay/:orderId', payLimiter, devPay);
router.post('/dev/activate', activateLimiter, devActivate);

router.get('/order/:idOrNumber', generalLimiter, getOrderStatus);
router.get('/my', generalLimiter, getMyAssets);

// возврат (dev)
router.post("/dev/refund/:idOrNumber", payLimiter, devRefund);

export default router;

