import express from 'express';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getSubcategories,
} from '../controllers/categoryController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, authorize('admin', 'staff'), createCategory);

router.route('/:id')
  .get(getCategoryById)
  .put(protect, authorize('admin', 'staff'), updateCategory)
  .delete(protect, authorize('admin'), deleteCategory);

router.route('/:id/subcategories')
  .get(getSubcategories);

export default router;
