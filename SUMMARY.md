# 📖 TÓM TẮT DỰ ÁN

## 🎯 Bạn cần cài gì?

### 1. Phần mềm bắt buộc (2 thứ)
```
✅ Node.js (v16+)     → https://nodejs.org/
✅ MongoDB            → https://www.mongodb.com/
```

### 2. Cài đặt project (1 lệnh)
```bash
# Windows
setup.bat

# Mac/Linux
./setup.sh
```

### 3. Chạy project (1 lệnh)
```bash
# Windows
start-dev.bat

# Mac/Linux
./start-dev.sh
```

---

## 📂 Cấu trúc project

```
elearning-platform/
├── backend/          → Node.js + Express + MongoDB
├── frontend/         → React + Vite
├── START_HERE.md     → 👈 BẮT ĐẦU TẠI ĐÂY
├── REQUIREMENTS.md   → Danh sách cần cài
├── QUICKSTART.md     → Hướng dẫn nhanh 5 phút
├── INSTALLATION.md   → Hướng dẫn chi tiết
├── CHECKLIST.md      → Danh sách kiểm tra
└── README.md         → Tài liệu dự án
```

---

## 🚀 Quy trình cài đặt

```
1. Cài Node.js + MongoDB
         ↓
2. Chạy setup.bat (hoặc setup.sh)
         ↓
3. Sửa file backend/.env (MongoDB URI)
         ↓
4. Chạy start-dev.bat (hoặc start-dev.sh)
         ↓
5. Mở http://localhost:5173
```

---

## 📚 Đọc file nào?

### Nếu bạn muốn:
- **Bắt đầu nhanh nhất** → `START_HERE.md`
- **Biết cần cài gì** → `REQUIREMENTS.md`
- **Hướng dẫn 5 phút** → `QUICKSTART.md`
- **Hướng dẫn chi tiết** → `INSTALLATION.md`
- **Checklist từng bước** → `CHECKLIST.md`
- **Tài liệu API** → `README.md`

---

## ⚡ Lệnh quan trọng

### Cài đặt
```bash
# Tự động (khuyến nghị)
setup.bat              # Windows
./setup.sh             # Mac/Linux

# Thủ công
cd backend && npm install
cd frontend && npm install
```

### Chạy project
```bash
# Tự động (khuyến nghị)
start-dev.bat          # Windows
./start-dev.sh         # Mac/Linux

# Thủ công
cd backend && npm run dev      # Terminal 1
cd frontend && npm run dev     # Terminal 2
```

### Kiểm tra
```bash
node --version         # Kiểm tra Node.js
npm --version          # Kiểm tra npm
mongosh                # Kiểm tra MongoDB
```

---

## 🎓 Tính năng chính

### Khách hàng
- Đăng ký / Đăng nhập
- Xem và tìm kiếm khóa học
- Lọc theo giá, danh mục, cấp độ
- Giỏ hàng
- Thanh toán (COD, chuyển khoản)
- Quản lý đơn hàng
- Chat support realtime

### Admin
- Dashboard thống kê
- Quản lý sản phẩm
- Quản lý đơn hàng
- Quản lý người dùng
- Quản lý mã giảm giá
- Phân quyền

---

## 🔧 Tech Stack

```
Frontend:  React + Vite + Zustand
Backend:   Node.js + Express
Database:  MongoDB + Mongoose
Realtime:  Socket.io
Auth:      JWT + Refresh Token
```

---

## 🌐 URLs

```
Frontend:  http://localhost:5173
Backend:   http://localhost:5000
API Docs:  http://localhost:5000/api
```

---

## ❓ Gặp vấn đề?

### Lỗi thường gặp:

**1. MongoDB không kết nối**
→ Kiểm tra MongoDB đã chạy chưa
→ Kiểm tra MONGODB_URI trong backend/.env

**2. Port đã được sử dụng**
→ Đổi PORT trong backend/.env
→ Hoặc kill process đang dùng port

**3. Module not found**
→ Xóa node_modules và chạy lại npm install

**4. CORS error**
→ Kiểm tra FRONTEND_URL trong backend/.env

---

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Đọc file INSTALLATION.md
2. Kiểm tra CHECKLIST.md
3. Xem console log để biết lỗi cụ thể
4. Google error message

---

## ✅ Bước tiếp theo

1. Đọc **START_HERE.md**
2. Cài đặt Node.js + MongoDB
3. Chạy setup script
4. Chạy project
5. Truy cập http://localhost:5173
6. Đăng ký tài khoản và test

---

**Chúc bạn thành công!** 🎉

Bắt đầu từ file **START_HERE.md** →
