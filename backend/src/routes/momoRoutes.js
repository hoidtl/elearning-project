import express from 'express';
import { createMoMoPayment, momoReturn, momoIPN } from '../controllers/momoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/momo/create', protect, createMoMoPayment);
router.get('/momo/return', momoReturn);
router.post('/momo/ipn', momoIPN);

export default router;
