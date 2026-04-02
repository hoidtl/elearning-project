# 📚 HƯỚNG DẪN THÊM KHÓA HỌC

## 🎯 CÁCH 1: DÙNG POSTMAN (Dễ nhất)

### Bước 1: Tạo tài khoản Admin

#### 1.1. Đăng ký tài khoản mới
- Mở trình duyệt: http://localhost:5173/register
- Điền thông tin:
  - Tên: Admin
  - Email: admin@example.com
  - Password: 123456

#### 1.2. Chuyển thành Admin trong MongoDB Compass
1. Mở MongoDB Compass
2. Kết nối: `mongodb://localhost:27017`
3. Chọn database: `elearning`
4. Chọn collection: `users`
5. Tìm user vừa tạo (email: admin@example.com)
6. Click vào user → Edit Document
7. Tìm field `role`, đổi từ `"customer"` thành `"admin"`
8. Click Update

#### 1.3. Đăng nhập lại
- Đăng xuất và đăng nhập lại với tài khoản admin

---

### Bước 2: Tạo Category (Danh mục)

#### 2.1. Lấy Access Token
1. Đăng nhập tại: http://localhost:5173/login
2. Mở DevTools (F12) → Console
3. Gõ: `localStorage.getItem('accessToken')`
4. Copy token (chuỗi dài)

#### 2.2. Tạo Category bằng Postman
1. Mở Postman
2. Tạo request mới:
   - Method: **POST**
   - URL: `http://localhost:5000/api/categories`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer YOUR_ACCESS_TOKEN` (thay YOUR_ACCESS_TOKEN)
     - Key: `Content-Type`
     - Value: `application/json`
   - Body → raw → JSON:
   ```json
   {
     "name": "Lập trình Web",
     "description": "Các khóa học về lập trình web"
   }
   ```
3. Click **Send**
4. Copy `_id` của category vừa tạo

---

### Bước 3: Thêm Khóa học (Product)

#### 3.1. Chuẩn bị ảnh
- Đặt ảnh khóa học vào: `frontend/public/images/courses/`
- Ví dụ: `web-development.jpg`

#### 3.2. Tạo Product bằng Postman
1. Tạo request mới:
   - Method: **POST**
   - URL: `http://localhost:5000/api/products`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer YOUR_ACCESS_TOKEN`
     - Key: `Content-Type`
     - Value: `application/json`
   - Body → raw → JSON:
   ```json
   {
     "name": "Lập trình Web từ cơ bản đến nâng cao",
     "description": "Khóa học đầy đủ về HTML, CSS, JavaScript, React và Node.js. Phù hợp cho người mới bắt đầu.",
     "price": 399000,
     "originalPrice": 999000,
     "images": ["/images/courses/web-development.jpg"],
     "category": "CATEGORY_ID_Ở_ĐÂY",
     "instructor": "Nguyễn Văn A",
     "level": "beginner",
     "duration": "40 giờ",
     "language": "Tiếng Việt",
     "stock": 100,
     "features": [
       "Học HTML, CSS từ cơ bản",
       "JavaScript ES6+",
       "React.js framework",
       "Node.js backend",
       "Dự án thực tế"
     ],
     "requirements": [
       "Máy tính có kết nối internet",
       "Không cần kiến thức lập trình trước"
     ],
     "isFeatured": true
   }
   ```
2. Thay `CATEGORY_ID_Ở_ĐÂY` bằng ID category ở bước 2
3. Click **Send**

---

## 🎯 CÁCH 2: DÙNG MONGODB COMPASS (Thủ công)

### Bước 1: Tạo Category
1. Mở MongoDB Compass
2. Database: `elearning` → Collection: `categories`
3. Click **ADD DATA** → Insert Document
4. Paste JSON:
```json
{
  "name": "Lập trình Web",
  "slug": "lap-trinh-web",
  "description": "Các khóa học về lập trình web",
  "isActive": true,
  "createdAt": {"$date": "2024-01-01T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-01-01T00:00:00.000Z"}
}
```
5. Click **Insert**
6. Copy `_id` của document vừa tạo

### Bước 2: Tạo Product
1. Collection: `products`
2. Click **ADD DATA** → Insert Document
3. Paste JSON:
```json
{
  "name": "Lập trình Web từ cơ bản đến nâng cao",
  "slug": "lap-trinh-web-co-ban-nang-cao",
  "description": "Khóa học đầy đủ về HTML, CSS, JavaScript, React và Node.js",
  "price": 399000,
  "originalPrice": 999000,
  "images": ["/images/courses/web-development.jpg"],
  "category": {"$oid": "CATEGORY_ID_Ở_ĐÂY"},
  "instructor": "Nguyễn Văn A",
  "level": "beginner",
  "duration": "40 giờ",
  "language": "Tiếng Việt",
  "stock": 100,
  "sold": 0,
  "rating": 4.5,
  "numReviews": 0,
  "features": [
    "Học HTML, CSS từ cơ bản",
    "JavaScript ES6+",
    "React.js framework",
    "Node.js backend",
    "Dự án thực tế"
  ],
  "requirements": [
    "Máy tính có kết nối internet",
    "Không cần kiến thức lập trình trước"
  ],
  "isActive": true,
  "isFeatured": true,
  "createdAt": {"$date": "2024-01-01T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-01-01T00:00:00.000Z"}
}
```
4. Thay `CATEGORY_ID_Ở_ĐÂY` bằng ID category
5. Click **Insert**

---

## 🎯 CÁCH 3: TẠO SCRIPT TỰ ĐỘNG (Nhanh nhất)

Tôi sẽ tạo script để thêm dữ liệu mẫu tự động!

---

## 📋 MẪU DỮ LIỆU KHÓA HỌC

### Khóa học 1: Lập trình Web
```json
{
  "name": "Lập trình Web từ cơ bản đến nâng cao",
  "price": 399000,
  "originalPrice": 999000,
  "instructor": "Nguyễn Văn A",
  "level": "beginner",
  "duration": "40 giờ"
}
```

### Khóa học 2: React.js
```json
{
  "name": "Khóa học React.js chuyên sâu",
  "price": 499000,
  "originalPrice": 1200000,
  "instructor": "Trần Thị B",
  "level": "intermediate",
  "duration": "35 giờ"
}
```

### Khóa học 3: Node.js
```json
{
  "name": "Backend với Node.js và Express",
  "price": 599000,
  "originalPrice": 1500000,
  "instructor": "Lê Văn C",
  "level": "intermediate",
  "duration": "45 giờ"
}
```

---

## 🔍 KIỂM TRA

Sau khi thêm, kiểm tra:
1. Mở: http://localhost:5173
2. Xem khóa học có hiển thị không
3. Click vào khóa học xem chi tiết

---

## ⚠️ LƯU Ý

### Về ảnh:
- Đặt ảnh trong: `frontend/public/images/courses/`
- Đường dẫn trong DB: `/images/courses/tên-file.jpg`

### Về giá:
- Nhập số không có dấu phẩy: `399000` (không phải `399,000`)
- Đơn vị: VNĐ

### Về level:
- `beginner` - Cơ bản
- `intermediate` - Trung cấp
- `advanced` - Nâng cao

---

Bạn muốn dùng cách nào? Tôi khuyến nghị **Cách 3** (script tự động) để nhanh nhất!
