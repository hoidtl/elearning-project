import rateLimit from 'express-rate-limit';

// Tăng limit cho development
const isDevelopment = process.env.NODE_ENV === 'development';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: isDevelopment ? 1000 : 100, // 1000 requests trong dev, 100 trong production
  message: 'Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau',
  skip: (req) => isDevelopment && req.ip === '::1', // Skip cho localhost trong dev
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDevelopment ? 50 : 5, // 50 lần trong dev, 5 lần trong production
  message: 'Quá nhiều lần đăng nhập, vui lòng thử lại sau 15 phút',
});
