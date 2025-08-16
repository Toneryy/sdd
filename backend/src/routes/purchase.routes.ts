// src/routes/purchase.routes.ts
import { Router } from 'express';
import { devCheckout, devPay, devActivate } from '../controllers/purchase.controller';

const router = Router();

router.post('/dev/checkout', devCheckout);
router.post('/dev/pay/:orderId', devPay);
router.post('/dev/activate', devActivate);

export default router;

