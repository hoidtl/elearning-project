# Hướng dẫn cấu hình Email OTP

## Tính năng đã thêm

Khi người dùng đăng ký tài khoản mới:
1. Hệ thống gửi mã OTP 6 số đến email
2. Người dùng nhập OTP để xác thực tài khoản
3. Sau khi xác thực thành công, gửi email chào mừng

## Cấu hình Email (Gmail)

### Bước 1: Tạo App Password cho Gmail

1. Đăng nhập Gmail của bạn
2. Vào **Google Account** → **Security**
3. Bật **2-Step Verification** (nếu chưa bật)
4. Tìm **App passwords** (Mật khẩu ứng dụng)
5. Chọn **Mail** và **Other (Custom name)**
6. Nhập tên: "E-Learning Platform"
7. Click **Generate** → Copy mật khẩu 16 ký tự

### Bước 2: Cập nhật file .env

Mở file `backend/.env` và thêm:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
```

**Ví dụ:**
```env
EMAIL_USER=myemail@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

### Bước 3: Restart Backend

```bash
cd backend
npm run dev
```

## Luồng hoạt động

### 1. Đăng ký
- User điền form đăng ký (tên, email, mật khẩu)
- Click "Đăng ký"
- Hệ thống tạo tài khoản với `isVerified: false`
- Gửi mã OTP 6 số đến email
- Chuyển đến trang `/verify-otp`

### 2. Xác thực OTP
- User nhập 6 số OTP từ email
- Mã OTP có hiệu lực 10 phút
- Nếu đúng → Tài khoản được kích hoạt, tự động đăng nhập
- Nếu sai → Hiển thị lỗi, cho phép nhập lại
- Có nút "Gửi lại mã OTP" (cooldown 60 giây)

### 3. Sau khi verify
- Gửi email chào mừng
- Tự động đăng nhập
- Chuyển đến trang chủ

## API Endpoints

### POST /api/auth/register
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "123456"
}
```

Response:
```json
{
  "success": true,
  "message": "Đăng ký thành công! Vui lòng kiểm tra email để lấy mã OTP",
  "data": {
    "userId": "...",
    "email": "user@example.com",
    "requireOTP": true
  }
}
```

### POST /api/auth/verify-otp
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

Response:
```json
{
  "success": true,
  "message": "Xác thực thành công!",
  "data": {
    "user": {...},
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

### POST /api/auth/resend-otp
```json
{
  "email": "user@example.com"
}
```

## Files đã tạo/cập nhật

1. `backend/src/models/User.js` - Thêm fields: isVerified, verificationOTP, verificationOTPExpire
2. `backend/src/utils/emailService.js` - Service gửi email OTP và welcome
3. `backend/src/controllers/authController.js` - Thêm verifyOTP, resendOTP
4. `backend/src/routes/authRoutes.js` - Thêm routes OTP
5. `frontend/src/pages/VerifyOTP.jsx` - Trang nhập OTP
6. `frontend/src/pages/Register.jsx` - Cập nhật flow đăng ký
7. `frontend/src/App.jsx` - Thêm route /verify-otp
8. `frontend/src/styles/global.css` - CSS cho OTP inputs

## Lưu ý

- Mã OTP có hiệu lực 10 phút
- Có thể gửi lại OTP sau 60 giây
- Email template responsive và đẹp mắt
- Tự động focus vào ô input tiếp theo khi nhập
- Hỗ trợ paste OTP từ clipboard

## Test

1. Đăng ký tài khoản mới
2. Kiểm tra email (cả Inbox và Spam)
3. Nhập mã OTP 6 số
4. Xác thực thành công → Tự động đăng nhập
