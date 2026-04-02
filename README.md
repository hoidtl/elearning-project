# E-COMMERCE LEARNING PLATFORM

Nền tảng thương mại điện tử học trực tuyến hoàn chỉnh với React, Node.js, Express, MongoDB.

---

## 🚀 BẮT ĐẦU NHANH

### Bạn cần cài gì?
1. **Node.js** (v16+) → https://nodejs.org/
2. **MongoDB** → https://www.mongodb.com/

### Cài đặt trong 3 bước:

**Windows:**
```bash
setup.bat           # 1. Cài đặt
# Sửa backend/.env  # 2. Cấu hình MongoDB
start-dev.bat       # 3. Chạy project
```

**Mac/Linux:**
```bash
chmod +x setup.sh start-dev.sh
./setup.sh          # 1. Cài đặt
# Sửa backend/.env  # 2. Cấu hình MongoDB
./start-dev.sh      # 3. Chạy project
```

### Truy cập:
- 🌐 Frontend: http://localhost:5173
- 🔧 Backend: http://localhost:5000

---

## 📚 TÀI LIỆU

- **[START_HERE.md](START_HERE.md)** ← 👈 BẮT ĐẦU TẠI ĐÂY
- **[REQUIREMENTS.md](REQUIREMENTS.md)** - Danh sách cần cài
- **[QUICKSTART.md](QUICKSTART.md)** - Hướng dẫn nhanh 5 phút
- **[INSTALLATION.md](INSTALLATION.md)** - Hướng dẫn chi tiết
- **[CHECKLIST.md](CHECKLIST.md)** - Danh sách kiểm tra

---

## 🚀 TÍNH NĂNG

### Khách hàng
- ✅ Đăng ký / Đăng nhập / Quên mật khẩu
- ✅ Xem danh sách khóa học với phân trang
- ✅ Tìm kiếm và lọc khóa học (giá, danh mục, cấp độ)
- ✅ Xem chi tiết khóa học
- ✅ Giỏ hàng (thêm/xóa/cập nhật)
- ✅ Thanh toán (COD, chuyển khoản)
- ✅ Quản lý đơn hàng
- ✅ Quản lý tài khoản
- ✅ Danh sách yêu thích
- ✅ Chat hỗ trợ realtime (Socket.io)
- ✅ Đánh giá và nhận xét

### Admin
- ✅ Dashboard thống kê
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý danh mục
- ✅ Quản lý đơn hàng
- ✅ Quản lý người dùng
- ✅ Quản lý mã giảm giá
- ✅ Quản lý nhà cung cấp
- ✅ Kiểm duyệt đánh giá
- ✅ Phân quyền (Admin, Staff)

## 🛠️ CÔNG NGHỆ

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + Refresh Token
- Socket.io (realtime chat)
- Bcrypt (mã hóa mật khẩu)
- Express Validator
- Helmet (bảo mật)
- Rate Limiting

### Frontend
- React 18
- Vite
- React Router v6
- Zustand (state management)
- Axios
- Socket.io Client
- React Icons
- React Toastify

## 📦 CÀI ĐẶT

### Yêu cầu
- Node.js >= 16
- MongoDB >= 5.0
- npm hoặc yarn

### Backend

```bash
cd backend
npm install

# Tạo file .env
cp .env.example .env

# Cập nhật thông tin trong .env:
# - MONGODB_URI
# - JWT_SECRET
# - JWT_REFRESH_SECRET
# - EMAIL_USER, EMAIL_PASSWORD (nếu dùng email)

# Chạy server
npm run dev
```

Server chạy tại: http://localhost:5000

### Frontend

```bash
cd frontend
npm install

# Tạo file .env
cp .env.example .env

# Cập nhật:
# VITE_API_URL=http://localhost:5000/api
# VITE_SOCKET_URL=http://localhost:5000

# Chạy app
npm run dev
```

App chạy tại: http://localhost:5173

## 📁 CẤU TRÚC DỰ ÁN

```
elearning-platform/
├── backend/
│   ├── src/
│   │   ├── config/          # Cấu hình database, JWT, socket
│   │   ├── models/          # MongoDB models
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── services/        # Email, upload, payment services
│   │   └── server.js        # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand stores
│   │   ├── services/        # API services
│   │   ├── styles/          # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## 🔐 API ENDPOINTS

### Authentication
```
POST   /api/auth/register       - Đăng ký
POST   /api/auth/login          - Đăng nhập
POST   /api/auth/logout         - Đăng xuất
POST   /api/auth/refresh        - Làm mới token
POST   /api/auth/forgot-password - Quên mật khẩu
PUT    /api/auth/reset-password/:token - Đặt lại mật khẩu
```

### Products
```
GET    /api/products            - Lấy danh sách sản phẩm
GET    /api/products/featured   - Sản phẩm nổi bật
GET    /api/products/:id        - Chi tiết sản phẩm
POST   /api/products            - Tạo sản phẩm (Admin)
PUT    /api/products/:id        - Cập nhật sản phẩm (Admin)
DELETE /api/products/:id        - Xóa sản phẩm (Admin)
```

### Cart
```
GET    /api/cart                - Lấy giỏ hàng
POST   /api/cart                - Thêm vào giỏ
PUT    /api/cart/:itemId        - Cập nhật số lượng
DELETE /api/cart/:itemId        - Xóa khỏi giỏ
DELETE /api/cart                - Xóa toàn bộ giỏ
```

### Orders
```
POST   /api/orders              - Tạo đơn hàng
GET    /api/orders/my-orders    - Đơn hàng của tôi
GET    /api/orders/:id          - Chi tiết đơn hàng
PUT    /api/orders/:id/status   - Cập nhật trạng thái (Admin)
PUT    /api/orders/:id/cancel   - Hủy đơn hàng
GET    /api/orders              - Tất cả đơn hàng (Admin)
```

## 🎨 TÍNH NĂNG NỔI BẬT

### 1. Authentication & Authorization
- JWT với Access Token và Refresh Token
- Tự động làm mới token khi hết hạn
- Phân quyền theo role (customer, admin, staff)
- Bảo mật với Helmet và Rate Limiting

### 2. Shopping Experience
- Tìm kiếm và lọc sản phẩm mạnh mẽ
- Giỏ hàng lưu trữ trong database
- Tính toán giá tự động
- Gợi ý sản phẩm liên quan

### 3. Order Management
- Quản lý trạng thái đơn hàng
- Lịch sử đơn hàng
- Hủy đơn hàng
- Cập nhật tồn kho tự động

### 4. Real-time Chat
- Chat hỗ trợ trực tiếp với admin
- Lưu trữ lịch sử chat
- Thông báo tin nhắn mới

### 5. Admin Dashboard
- Thống kê doanh thu
- Quản lý sản phẩm, đơn hàng, người dùng
- Phân quyền chi tiết
- Kiểm duyệt nội dung

## 🔒 BẢO MẬT

- Mã hóa mật khẩu với bcrypt
- JWT tokens với expiry
- Helmet cho HTTP headers
- Rate limiting chống spam
- Input validation
- XSS protection
- CORS configuration

## 📱 RESPONSIVE DESIGN

- Mobile-first approach
- Responsive trên tất cả thiết bị
- Touch-friendly interface
- Optimized performance

## 🚀 DEPLOYMENT

### Backend (Heroku/Railway/Render)
```bash
# Build
npm install --production

# Start
npm start
```

### Frontend (Vercel/Netlify)
```bash
# Build
npm run build

# Preview
npm run preview
```

### Environment Variables
Đảm bảo cấu hình đúng các biến môi trường trên production:
- MONGODB_URI (MongoDB Atlas)
- JWT_SECRET (strong random string)
- FRONTEND_URL (production URL)

## 📝 TODO / FUTURE FEATURES

- [ ] Payment gateway integration (VNPay, Momo)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced analytics
- [ ] Course progress tracking
- [ ] Video streaming
- [ ] Certificate generation
- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA support

## 👥 ĐÓNG GÓP

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## 📄 LICENSE

MIT License

## 📞 LIÊN HỆ

- Email: support@elearning.com
- Website: https://elearning.com

---

Made with ❤️ by E-Learning Team
