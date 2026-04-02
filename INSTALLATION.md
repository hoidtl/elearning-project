# HƯỚNG DẪN CÀI ĐẶT CHI TIẾT

## Bước 1: Cài đặt các công cụ cần thiết

### 1.1. Cài đặt Node.js
- Truy cập: https://nodejs.org/
- Tải phiên bản LTS (khuyến nghị: v18 hoặc v20)
- Cài đặt và kiểm tra:
```bash
node --version
npm --version
```

### 1.2. Cài đặt MongoDB

**Cách 1: MongoDB Community Server (Local)**
- Truy cập: https://www.mongodb.com/try/download/community
- Tải và cài đặt MongoDB Community Server
- Khởi động MongoDB:
  - Windows: MongoDB sẽ tự động chạy như service
  - Mac: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`

**Cách 2: MongoDB Atlas (Cloud - Khuyến nghị)**
- Truy cập: https://www.mongodb.com/cloud/atlas
- Đăng ký tài khoản miễn phí
- Tạo cluster mới (chọn FREE tier)
- Lấy connection string

### 1.3. Cài đặt Git (nếu chưa có)
- Truy cập: https://git-scm.com/
- Tải và cài đặt

## Bước 2: Cài đặt Backend

### 2.1. Di chuyển vào thư mục backend
```bash
cd backend
```

### 2.2. Cài đặt dependencies
```bash
npm install
```

### 2.3. Tạo file .env
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### 2.4. Cấu hình file .env
Mở file `backend/.env` và cập nhật:

```env
NODE_ENV=development
PORT=5000

# MongoDB Local
MONGODB_URI=mongodb://localhost:27017/elearning

# Hoặc MongoDB Atlas (nếu dùng cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/elearning

# JWT Secrets (tạo chuỗi ngẫu nhiên mạnh)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_123456
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_change_this_789
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Email (tùy chọn - để sau)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Upload
MAX_FILE_SIZE=5242880
```

### 2.5. Chạy Backend
```bash
npm run dev
```

Nếu thành công, bạn sẽ thấy:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

## Bước 3: Cài đặt Frontend

### 3.1. Mở terminal mới, di chuyển vào thư mục frontend
```bash
cd frontend
```

### 3.2. Cài đặt dependencies
```bash
npm install
```

### 3.3. Tạo file .env
```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### 3.4. Cấu hình file .env
Mở file `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 3.5. Chạy Frontend
```bash
npm run dev
```

Nếu thành công, bạn sẽ thấy:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Bước 4: Truy cập ứng dụng

Mở trình duyệt và truy cập:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Bước 5: Tạo dữ liệu mẫu (Optional)

Bạn có thể tạo tài khoản admin và sản phẩm mẫu bằng cách:

1. Đăng ký tài khoản mới tại: http://localhost:5173/register
2. Vào MongoDB và cập nhật role thành admin:
   - Mở MongoDB Compass hoặc mongosh
   - Tìm user vừa tạo
   - Cập nhật field `role` thành `"admin"`

## XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi 1: "Cannot find module"
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi 2: "EADDRINUSE: address already in use"
```bash
# Port đã được sử dụng, đổi port trong .env
# Hoặc kill process đang dùng port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Lỗi 3: "MongooseServerSelectionError"
- Kiểm tra MongoDB đã chạy chưa
- Kiểm tra MONGODB_URI trong .env
- Nếu dùng Atlas, kiểm tra IP whitelist và password

### Lỗi 4: "CORS error"
- Kiểm tra FRONTEND_URL trong backend/.env
- Đảm bảo frontend chạy đúng port 5173

### Lỗi 5: "Module not found" trong React
```bash
# Xóa cache và rebuild
cd frontend
rm -rf node_modules .vite
npm install
npm run dev
```

## KIỂM TRA CÀI ĐẶT

### Backend
```bash
# Test API
curl http://localhost:5000
# Kết quả: {"message":"E-Learning Platform API"}
```

### Frontend
- Mở http://localhost:5173
- Bạn sẽ thấy trang chủ với hero section

### Database
```bash
# Kết nối MongoDB
mongosh mongodb://localhost:27017/elearning

# Hoặc dùng MongoDB Compass
# Connection string: mongodb://localhost:27017
```

## CÔNG CỤ HỖ TRỢ (Khuyến nghị)

1. **MongoDB Compass** - GUI cho MongoDB
   - https://www.mongodb.com/products/compass

2. **Postman** - Test API
   - https://www.postman.com/

3. **VS Code Extensions**
   - ES7+ React/Redux/React-Native snippets
   - ESLint
   - Prettier
   - MongoDB for VS Code

## CHẠY PRODUCTION

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## HỖ TRỢ

Nếu gặp vấn đề, kiểm tra:
1. Node.js version >= 16
2. MongoDB đã chạy
3. Port 5000 và 5173 chưa bị sử dụng
4. File .env đã cấu hình đúng
5. npm install đã chạy thành công

---

Chúc bạn cài đặt thành công! 🚀
