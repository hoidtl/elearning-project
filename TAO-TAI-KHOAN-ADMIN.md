# 🔐 Tạo Tài Khoản Admin

## ⚡ Cách Nhanh Nhất (Khuyến nghị)

### Bước 1: Chạy script tạo admin
```bash
cd backend
node src/utils/createAdmin.js
```

### Bước 2: Đăng nhập
```
Email:    admin@elearning.com
Password: admin123456
```

### Bước 3: Truy cập Admin Dashboard
```
http://localhost:5173/admin
```

---

## 📋 Thông tin đăng nhập mặc định

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email:    admin@elearning.com
🔑 Password: admin123456
👤 Role:     admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🔄 Cách Khác: Tạo từ tài khoản có sẵn

### Nếu bạn đã có tài khoản:

1. **Mở MongoDB Compass** hoặc **mongosh**

2. **Chọn database** của bạn (thường là `elearning`)

3. **Chọn collection** `users`

4. **Chạy lệnh:**
```javascript
db.users.updateOne(
  { email: "email-cua-ban@example.com" },
  { $set: { role: "admin" } }
)
```

5. **Đăng xuất và đăng nhập lại**

---

## 🛠️ Sử dụng mongosh (Command Line)

```bash
# 1. Mở mongosh
mongosh

# 2. Chọn database
use elearning

# 3. Cập nhật role
db.users.updateOne(
  { email: "email-cua-ban@example.com" },
  { $set: { role: "admin" } }
)

# 4. Kiểm tra
db.users.findOne({ email: "email-cua-ban@example.com" })
```

---

## ✅ Kiểm tra tài khoản admin

### Cách 1: Qua MongoDB Compass
1. Mở collection `users`
2. Tìm user có `role: "admin"`
3. Kiểm tra email

### Cách 2: Qua mongosh
```javascript
db.users.find({ role: "admin" })
```

---

## 🔒 Bảo mật

### ⚠️ QUAN TRỌNG:

1. **Đổi mật khẩu ngay sau khi đăng nhập lần đầu**
2. **Không chia sẻ thông tin đăng nhập admin**
3. **Sử dụng mật khẩu mạnh trong production**
4. **Xóa tài khoản admin mặc định khi deploy**

### Đổi mật khẩu admin:
```javascript
// Trong MongoDB
db.users.updateOne(
  { email: "admin@elearning.com" },
  { $set: { password: "mat-khau-moi-da-hash" } }
)
```

**Lưu ý:** Password phải được hash bằng bcrypt trước khi lưu!

---

## 🐛 Xử lý lỗi

### Lỗi: "Admin đã tồn tại"
**Giải pháp:**
```javascript
// Xóa admin cũ
db.users.deleteOne({ email: "admin@elearning.com" })

// Chạy lại script
node src/utils/createAdmin.js
```

### Lỗi: "Cannot connect to MongoDB"
**Giải pháp:**
1. Kiểm tra MongoDB đã chạy: `mongosh`
2. Kiểm tra `MONGODB_URI` trong `backend/.env`
3. Khởi động MongoDB: `net start MongoDB` (Windows)

### Lỗi: "User model not found"
**Giải pháp:**
```bash
# Đảm bảo đang ở thư mục backend
cd backend

# Chạy lại
node src/utils/createAdmin.js
```

---

## 📝 Tạo nhiều admin

Nếu cần tạo nhiều tài khoản admin:

```javascript
// Trong MongoDB Compass hoặc mongosh
db.users.insertMany([
  {
    name: "Admin 1",
    email: "admin1@elearning.com",
    password: "$2a$10$...", // Hash của password
    role: "admin",
    phone: "0123456789"
  },
  {
    name: "Admin 2",
    email: "admin2@elearning.com",
    password: "$2a$10$...", // Hash của password
    role: "admin",
    phone: "0987654321"
  }
])
```

**Lưu ý:** Password phải được hash trước!

---

## 🎯 Quy trình hoàn chỉnh

```
1. Chạy MongoDB
   ↓
2. Chạy backend server (npm run dev)
   ↓
3. Chạy script tạo admin (node src/utils/createAdmin.js)
   ↓
4. Mở frontend (http://localhost:5173)
   ↓
5. Đăng nhập với admin@elearning.com / admin123456
   ↓
6. Truy cập /admin
   ↓
7. Đổi mật khẩu ngay!
```

---

## 💡 Tips

### Kiểm tra nhanh role của user:
```javascript
db.users.find({}, { name: 1, email: 1, role: 1 })
```

### Đếm số admin:
```javascript
db.users.countDocuments({ role: "admin" })
```

### Tìm tất cả admin:
```javascript
db.users.find({ role: "admin" })
```

### Xóa tất cả admin (cẩn thận!):
```javascript
db.users.deleteMany({ role: "admin" })
```

---

## 📞 Cần hỗ trợ?

Nếu gặp vấn đề:
1. Kiểm tra MongoDB đã chạy
2. Kiểm tra backend server đã chạy
3. Xem console log để biết lỗi cụ thể
4. Đọc lại hướng dẫn

---

## 🎉 Hoàn thành!

Sau khi tạo admin thành công:
- ✅ Đăng nhập tại: http://localhost:5173/login
- ✅ Truy cập admin: http://localhost:5173/admin
- ✅ Bắt đầu quản lý website!

**Chúc bạn thành công!** 🚀
