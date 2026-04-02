# ✅ CHECKLIST CÀI ĐẶT

## Trước khi bắt đầu

- [ ] Đã cài Node.js (v16 trở lên)
- [ ] Đã cài MongoDB (hoặc có MongoDB Atlas account)
- [ ] Đã cài Git (optional)
- [ ] Có text editor (VS Code khuyến nghị)

## Bước 1: Cài đặt Node.js

- [ ] Tải Node.js từ https://nodejs.org/
- [ ] Cài đặt Node.js
- [ ] Kiểm tra: `node --version` (phải >= v16)
- [ ] Kiểm tra: `npm --version`

## Bước 2: Cài đặt MongoDB

### Option A: MongoDB Local
- [ ] Tải MongoDB Community từ https://www.mongodb.com/try/download/community
- [ ] Cài đặt MongoDB
- [ ] Khởi động MongoDB service
- [ ] Kiểm tra: `mongosh` hoặc MongoDB Compass

### Option B: MongoDB Atlas (Cloud)
- [ ] Đăng ký tài khoản tại https://www.mongodb.com/cloud/atlas
- [ ] Tạo cluster miễn phí
- [ ] Tạo database user
- [ ] Whitelist IP (0.0.0.0/0 cho development)
- [ ] Copy connection string

## Bước 3: Setup Project

### Tự động (Khuyến nghị)
- [ ] Chạy `setup.bat` (Windows) hoặc `./setup.sh` (Mac/Linux)
- [ ] Đợi cài đặt hoàn tất

### Thủ công
- [ ] `cd backend && npm install`
- [ ] `cd frontend && npm install`

## Bước 4: Cấu hình

### Backend
- [ ] Copy `backend/.env.example` thành `backend/.env`
- [ ] Cập nhật `MONGODB_URI` trong backend/.env
- [ ] Cập nhật `JWT_SECRET` (chuỗi ngẫu nhiên mạnh)
- [ ] Cập nhật `JWT_REFRESH_SECRET` (chuỗi ngẫu nhiên khác)
- [ ] Kiểm tra `FRONTEND_URL=http://localhost:5173`

### Frontend
- [ ] Copy `frontend/.env.example` thành `frontend/.env`
- [ ] Kiểm tra `VITE_API_URL=http://localhost:5000/api`
- [ ] Kiểm tra `VITE_SOCKET_URL=http://localhost:5000`

## Bước 5: Chạy Project

### Option A: Chạy tự động
- [ ] Windows: Chạy `start-dev.bat`
- [ ] Mac/Linux: Chạy `./start-dev.sh`

### Option B: Chạy thủ công
- [ ] Terminal 1: `cd backend && npm run dev`
- [ ] Terminal 2: `cd frontend && npm run dev`

## Bước 6: Kiểm tra

- [ ] Backend chạy tại http://localhost:5000
- [ ] Frontend chạy tại http://localhost:5173
- [ ] Mở browser, truy cập http://localhost:5173
- [ ] Thấy trang chủ E-Learning
- [ ] Console không có lỗi

## Bước 7: Test chức năng

- [ ] Đăng ký tài khoản mới
- [ ] Đăng nhập thành công
- [ ] Xem danh sách khóa học
- [ ] Thêm khóa học vào giỏ hàng
- [ ] Xem giỏ hàng

## Bước 8: Tạo Admin (Optional)

### Cách 1: MongoDB Compass
- [ ] Mở MongoDB Compass
- [ ] Kết nối đến database
- [ ] Tìm collection `users`
- [ ] Tìm user vừa tạo
- [ ] Sửa field `role` thành `"admin"`

### Cách 2: mongosh
```javascript
use elearning
db.users.updateOne(
  { email: "your_email@example.com" },
  { $set: { role: "admin" } }
)
```

- [ ] Đăng xuất và đăng nhập lại
- [ ] Truy cập http://localhost:5173/admin
- [ ] Thấy trang admin dashboard

## Troubleshooting

### Nếu Backend không chạy
- [ ] Kiểm tra MongoDB đã chạy chưa
- [ ] Kiểm tra MONGODB_URI trong .env
- [ ] Kiểm tra port 5000 có bị chiếm không
- [ ] Xem log lỗi trong terminal

### Nếu Frontend không chạy
- [ ] Kiểm tra port 5173 có bị chiếm không
- [ ] Xóa node_modules và cài lại
- [ ] Xóa folder .vite
- [ ] Chạy lại npm install

### Nếu không kết nối được API
- [ ] Kiểm tra CORS trong backend
- [ ] Kiểm tra FRONTEND_URL trong backend/.env
- [ ] Kiểm tra VITE_API_URL trong frontend/.env
- [ ] Mở Network tab trong DevTools

## Công cụ hỗ trợ (Optional)

- [ ] Cài MongoDB Compass (GUI cho MongoDB)
- [ ] Cài Postman (test API)
- [ ] Cài VS Code extensions:
  - [ ] ES7+ React/Redux snippets
  - [ ] ESLint
  - [ ] Prettier
  - [ ] MongoDB for VS Code

## Hoàn thành! 🎉

- [ ] Project chạy thành công
- [ ] Đã test các chức năng cơ bản
- [ ] Đã tạo tài khoản admin
- [ ] Sẵn sàng phát triển

---

**Gặp vấn đề?** Xem file `INSTALLATION.md` để biết hướng dẫn chi tiết hơn.
