import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createOrder)
  .get(authorize('admin', 'staff'), getAllOrders);

router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', authorize('admin', 'staff'), updateOrderStatus);
router.put('/:id/cancel', cancelOrder);

export default router;
