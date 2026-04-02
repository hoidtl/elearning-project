# 🎯 BẮT ĐẦU TẠI ĐÂY

## Cài đặt nhanh trong 3 bước

### 1️⃣ Cài đặt yêu cầu

**Node.js** (bắt buộc)
- Tải: https://nodejs.org/
- Chọn phiên bản LTS
- Cài đặt và restart terminal

**MongoDB** (chọn 1 trong 2)

**Option A - Local (đơn giản hơn):**
- Tải: https://www.mongodb.com/try/download/community
- Cài đặt và chạy

**Option B - Cloud (khuyến nghị):**
- Đăng ký: https://www.mongodb.com/cloud/atlas
- Tạo cluster miễn phí
- Lấy connection string

### 2️⃣ Cài đặt project

**Windows:**
```bash
# Chạy file setup
setup.bat
```

**Mac/Linux:**
```bash
# Cho phép chạy script
chmod +x setup.sh

# Chạy setup
./setup.sh
```

### 3️⃣ Cấu hình và chạy

**Bước 1: Cấu hình MongoDB**

Mở file `backend/.env` và sửa dòng:
```env
# Nếu dùng MongoDB local:
MONGODB_URI=mongodb://localhost:27017/elearning

# Nếu dùng MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/elearning
```

**Bước 2: Chạy project**

**Windows:**
```bash
start-dev.bat
```

**Mac/Linux:**
```bash
./start-dev.sh
```

**Hoặc chạy thủ công:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 4️⃣ Truy cập

Mở trình duyệt:
- 🌐 **Frontend:** http://localhost:5173
- 🔧 **Backend API:** http://localhost:5000

### 5️⃣ Tạo tài khoản Admin (Tùy chọn)

**Windows:**
```bash
create-admin.bat
```

**Mac/Linux:**
```bash
chmod +x create-admin.sh
./create-admin.sh
```

**Thông tin đăng nhập admin:**
```
Email:    admin@elearning.com
Password: admin123456
```

**Truy cập Admin Dashboard:** http://localhost:5173/admin

📖 **Chi tiết:** Xem file `TAO-TAI-KHOAN-ADMIN.md`

---

## 📚 Tài liệu chi tiết

- **QUICKSTART.md** - Hướng dẫn nhanh 5 phút
- **INSTALLATION.md** - Hướng dẫn chi tiết từng bước
- **CHECKLIST.md** - Danh sách kiểm tra đầy đủ
- **README.md** - Tài liệu dự án và API

---

## ❓ Gặp lỗi?

### MongoDB không kết nối được
```bash
# Kiểm tra MongoDB đã chạy chưa
# Windows: Mở Services, tìm MongoDB
# Mac: brew services list
# Linux: sudo systemctl status mongod
```

### Port đã được sử dụng
```bash
# Đổi port trong backend/.env
PORT=5001

# Hoặc kill process
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -ti:5000 | xargs kill -9
```

### Module not found
```bash
# Xóa và cài lại
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 🎓 Tính năng chính

✅ Đăng ký / Đăng nhập  
✅ Xem và tìm kiếm khóa học  
✅ Giỏ hàng  
✅ Thanh toán  
✅ Quản lý đơn hàng  
✅ Admin dashboard  
✅ Chat support realtime  

---

## 🚀 Bước tiếp theo

1. Đăng ký tài khoản tại http://localhost:5173/register
2. Đăng nhập và khám phá các tính năng
3. Để trở thành admin, xem hướng dẫn trong CHECKLIST.md

---

**Chúc bạn thành công!** 🎉

Nếu cần hỗ trợ, xem các file hướng dẫn chi tiết hoặc kiểm tra console log để biết lỗi cụ thể.
