# 📋 YÊU CẦU HỆ THỐNG

## Phần mềm bắt buộc

### 1. Node.js (v16 trở lên)
**Tải về:** https://nodejs.org/

**Kiểm tra đã cài:**
```bash
node --version
npm --version
```

**Phiên bản khuyến nghị:**
- Node.js: v18.x hoặc v20.x (LTS)
- npm: v9.x trở lên

---

### 2. MongoDB

**Option A: MongoDB Community Server (Local)**

**Tải về:** https://www.mongodb.com/try/download/community

**Hệ điều hành:**
- Windows: MongoDB Community Server MSI
- Mac: `brew install mongodb-community`
- Linux: Theo hướng dẫn tại mongodb.com

**Khởi động:**
- Windows: Tự động chạy như Windows Service
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

**Kiểm tra:**
```bash
mongosh
# Hoặc
mongo
```

---

**Option B: MongoDB Atlas (Cloud - Khuyến nghị)**

**Đăng ký:** https://www.mongodb.com/cloud/atlas

**Ưu điểm:**
- ✅ Miễn phí 512MB
- ✅ Không cần cài đặt
- ✅ Truy cập từ mọi nơi
- ✅ Backup tự động

**Các bước:**
1. Đăng ký tài khoản
2. Tạo cluster (chọn FREE tier)
3. Tạo database user
4. Whitelist IP: 0.0.0.0/0 (cho development)
5. Lấy connection string

---

## Phần mềm khuyến nghị (Optional)

### 1. Git
**Tải về:** https://git-scm.com/

**Mục đích:** Clone project, version control

---

### 2. MongoDB Compass
**Tải về:** https://www.mongodb.com/products/compass

**Mục đích:** GUI để quản lý MongoDB, xem dữ liệu

---

### 3. Postman
**Tải về:** https://www.postman.com/

**Mục đích:** Test API endpoints

---

### 4. VS Code
**Tải về:** https://code.visualstudio.com/

**Extensions khuyến nghị:**
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier - Code formatter
- MongoDB for VS Code
- Thunder Client (alternative to Postman)

---

## Yêu cầu hệ thống

### Tối thiểu
- **CPU:** 2 cores
- **RAM:** 4GB
- **Disk:** 2GB trống
- **OS:** Windows 10, macOS 10.14+, Ubuntu 18.04+

### Khuyến nghị
- **CPU:** 4 cores
- **RAM:** 8GB
- **Disk:** 5GB trống
- **Internet:** Ổn định (để tải packages)

---

## Port cần thiết

Đảm bảo các port sau chưa bị sử dụng:

- **5000** - Backend API
- **5173** - Frontend (Vite dev server)
- **27017** - MongoDB (nếu dùng local)

**Kiểm tra port:**
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

---

## Kiến thức yêu cầu

### Cơ bản (để chạy project)
- Biết mở terminal/command prompt
- Biết chạy lệnh cơ bản (cd, npm)
- Biết edit file text

### Nâng cao (để phát triển)
- JavaScript/ES6+
- React.js
- Node.js/Express
- MongoDB/Mongoose
- REST API
- Git

---

## Checklist trước khi bắt đầu

- [ ] Đã cài Node.js (v16+)
- [ ] Đã cài MongoDB hoặc có MongoDB Atlas
- [ ] Đã kiểm tra port 5000, 5173 chưa bị chiếm
- [ ] Có kết nối internet ổn định
- [ ] Có text editor (VS Code khuyến nghị)
- [ ] Đã đọc file START_HERE.md

---

## Tổng kết

**Bắt buộc phải có:**
1. ✅ Node.js (v16+)
2. ✅ MongoDB (Local hoặc Atlas)

**Nên có:**
3. Git
4. MongoDB Compass
5. VS Code

**Thời gian cài đặt:** 15-30 phút

---

Sau khi cài đặt xong, đọc file **START_HERE.md** để bắt đầu!
