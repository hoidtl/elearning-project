import express from 'express';
import { uploadImage, uploadMultipleImages } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Single image upload
router.post(
  '/',
  protect,
  authorize('admin', 'staff'),
  upload.single('image'),
  uploadImage
);

// Multiple images upload
router.post(
  '/multiple',
  protect,
  authorize('admin', 'staff'),
  upload.array('images', 5), // Max 5 images
  uploadMultipleImages
);

export default router;
