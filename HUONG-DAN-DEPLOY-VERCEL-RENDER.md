# Hướng dẫn Deploy lên Vercel + Render

## Bước 1: Chuẩn bị code

### 1.1. Tạo file vercel.json cho frontend

Tạo file `frontend/vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 1.2. Cập nhật package.json cho backend

Đảm bảo `backend/package.json` có:
```json
{
  "type": "module",
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "start": "node src/server.js"
  }
}
```

### 1.3. Push code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Bước 2: Deploy Backend lên Render

1. Truy cập: https://render.com
2. Đăng ký/Đăng nhập (dùng GitHub)
3. Click **"New +"** → **"Web Service"**
4. Connect GitHub repository
5. Cấu hình:
   - **Name**: `elearning-backend`
   - **Region**: Singapore
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

6. **Environment Variables** (Add):
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_EXPIRE=7d
   JWT_REFRESH_EXPIRE=30d
   EMAIL_USER=your_email
   EMAIL_PASSWORD=your_email_password
   FRONTEND_URL=https://your-app.vercel.app
   ```

7. Click **"Create Web Service"**
8. Đợi deploy xong, copy URL (ví dụ: `https://elearning-backend.onrender.com`)

## Bước 3: Deploy Frontend lên Vercel

1. Truy cập: https://vercel.com
2. Đăng ký/Đăng nhập (dùng GitHub)
3. Click **"Add New..."** → **"Project"**
4. Import GitHub repository
5. Cấu hình:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. **Environment Variables**:
   ```
   VITE_API_URL=https://elearning-backend.onrender.com/api
   VITE_SOCKET_URL=https://elearning-backend.onrender.com
   ```

7. Click **"Deploy"**
8. Đợi deploy xong, copy URL (ví dụ: `https://your-app.vercel.app`)

## Bước 4: Cập nhật CORS và FRONTEND_URL

1. Quay lại Render Dashboard
2. Vào Web Service backend
3. **Environment** → Edit `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
4. Save → Service sẽ tự động redeploy

## Bước 5: Setup MongoDB Atlas (nếu chưa có)

1. Truy cập: https://www.mongodb.com/cloud/atlas
2. Tạo tài khoản miễn phí
3. Create Cluster (chọn Free tier)
4. Database Access → Add User
5. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
6. Connect → Connect your application → Copy connection string
7. Thay `<password>` bằng password thật
8. Cập nhật `MONGODB_URI` trong Render

## Bước 6: Test VNPay

1. Truy cập: `https://your-app.vercel.app`
2. Thêm sản phẩm vào giỏ hàng
3. Checkout → Chọn VNPay
4. Thanh toán sẽ hoạt động với URL công khai!

## Lưu ý

- Render free tier có thể sleep sau 15 phút không hoạt động
- Lần đầu truy cập sau khi sleep sẽ mất ~30s để wake up
- Vercel không bị sleep
- Cả 2 đều miễn phí và đủ để test VNPay

## Troubleshooting

### Lỗi CORS
Kiểm tra `backend/src/server.js` có đúng CORS config:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
```

### Backend không kết nối MongoDB
Kiểm tra:
- MongoDB Atlas IP whitelist
- Connection string đúng format
- Password không có ký tự đặc biệt (hoặc encode URL)

### Frontend không gọi được API
Kiểm tra `VITE_API_URL` trong Vercel Environment Variables
