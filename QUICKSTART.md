# 🚀 HƯỚNG DẪN NHANH - 5 PHÚT

## Yêu cầu
- ✅ Node.js (v16+)
- ✅ MongoDB

## Cài đặt tự động (Windows)

```bash
# 1. Chạy script setup
setup.bat

# 2. Chỉnh sửa file .env trong backend và frontend

# 3. Chạy cả 2 server cùng lúc
start-dev.bat
```

## Cài đặt tự động (Mac/Linux)

```bash
# 1. Cho phép chạy script
chmod +x setup.sh start-dev.sh

# 2. Chạy setup
./setup.sh

# 3. Chỉnh sửa file .env trong backend và frontend

# 4. Chạy cả 2 server
./start-dev.sh
```

## Cài đặt thủ công

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Chỉnh sửa .env
npm run dev
```

### Frontend (Terminal mới)
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Truy cập

- 🌐 Frontend: http://localhost:5173
- 🔧 Backend API: http://localhost:5000

## Cấu hình tối thiểu

### backend/.env
```env
MONGODB_URI=mongodb://localhost:27017/elearning
JWT_SECRET=your_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_here
FRONTEND_URL=http://localhost:5173
```

### frontend/.env
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Kiểm tra

1. Mở http://localhost:5173
2. Đăng ký tài khoản mới
3. Thử thêm sản phẩm vào giỏ hàng

## Lỗi thường gặp

**MongoDB không kết nối được?**
```bash
# Kiểm tra MongoDB đã chạy
# Windows: Mở Services, tìm MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Port đã được sử dụng?**
- Đổi PORT trong backend/.env
- Đổi port trong frontend/vite.config.js

**Module not found?**
```bash
# Xóa và cài lại
rm -rf node_modules package-lock.json
npm install
```

## Tài liệu đầy đủ

Xem file `INSTALLATION.md` để biết hướng dẫn chi tiết.

---

Chúc bạn thành công! 🎉
