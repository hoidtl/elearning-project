import express from 'express';
import { createVNPayPayment, vnpayReturn, vnpayIPN } from '../controllers/paymentController.js';
import { createMoMoPayment, momoReturn, momoIPN } from '../controllers/momoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// VNPay routes
router.post('/vnpay/create', protect, createVNPayPayment);
router.get('/vnpay/return', vnpayReturn);
router.get('/vnpay/ipn', vnpayIPN);

// MoMo routes
router.post('/momo/create', protect, createMoMoPayment);
router.get('/momo/return', momoReturn);
router.post('/momo/ipn', momoIPN);

export default router;
