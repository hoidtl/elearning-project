# ⚡ THÊM KHÓA HỌC NHANH - 3 BƯỚC

## 🚀 CÁCH NHANH NHẤT (Khuyến nghị)

### Bước 1: Chạy script tự động

Mở terminal trong folder `backend` và chạy:

```powershell
cd backend
npm run seed
```

Script sẽ tự động:
- ✅ Tạo 5 categories (danh mục)
- ✅ Tạo 6 products (khóa học) với đầy đủ thông tin
- ✅ Xóa dữ liệu cũ trước khi thêm mới

### Bước 2: Thêm ảnh cho khóa học (Tùy chọn)

Đặt ảnh vào folder: `frontend/public/images/courses/`

Tên file khuyến nghị:
- `web-dev.jpg` - Lập trình Web
- `react.jpg` - React.js
- `nodejs.jpg` - Node.js
- `mern.jpg` - Full Stack MERN
- `python-ds.jpg` - Python Data Science
- `react-native.jpg` - React Native

### Bước 3: Xem kết quả

Mở trình duyệt: http://localhost:5173

Bạn sẽ thấy 6 khóa học mới!

---

## 📝 THÊM KHÓA HỌC THỦ CÔNG

### Cách 1: Dùng MongoDB Compass

1. Mở MongoDB Compass
2. Kết nối: `mongodb://localhost:27017`
3. Database: `elearning` → Collection: `products`
4. Click **ADD DATA** → Insert Document
5. Paste JSON (xem mẫu bên dưới)
6. Click **Insert**

### Cách 2: Dùng Postman

1. Đăng nhập để lấy token
2. POST `http://localhost:5000/api/products`
3. Headers:
   - `Authorization: Bearer YOUR_TOKEN`
   - `Content-Type: application/json`
4. Body: JSON (xem mẫu bên dưới)

---

## 📋 MẪU JSON KHÓA HỌC

### Mẫu đơn giản:
```json
{
  "name": "Tên khóa học",
  "description": "Mô tả chi tiết",
  "price": 399000,
  "originalPrice": 999000,
  "images": ["/images/courses/ten-anh.jpg"],
  "category": "CATEGORY_ID",
  "instructor": "Tên giảng viên",
  "level": "beginner",
  "duration": "40 giờ",
  "language": "Tiếng Việt",
  "stock": 100,
  "isFeatured": true
}
```

### Mẫu đầy đủ:
```json
{
  "name": "Khóa học JavaScript nâng cao",
  "slug": "khoa-hoc-javascript-nang-cao",
  "description": "Học JavaScript từ cơ bản đến nâng cao với ES6+, async/await, promises và nhiều hơn nữa",
  "price": 499000,
  "originalPrice": 1200000,
  "images": [
    "/images/courses/javascript.jpg"
  ],
  "category": {"$oid": "CATEGORY_ID_HERE"},
  "instructor": "Nguyễn Văn A",
  "level": "intermediate",
  "duration": "35 giờ",
  "language": "Tiếng Việt",
  "stock": 100,
  "sold": 0,
  "rating": 4.5,
  "numReviews": 0,
  "features": [
    "ES6+ syntax",
    "Async/Await và Promises",
    "Closures và Scope",
    "OOP trong JavaScript",
    "Functional Programming"
  ],
  "requirements": [
    "Biết HTML, CSS cơ bản",
    "Có kiến thức JavaScript cơ bản"
  ],
  "isActive": true,
  "isFeatured": true,
  "createdAt": {"$date": "2024-01-01T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-01-01T00:00:00.000Z"}
}
```

---

## 🎨 LEVEL (Cấp độ)

- `beginner` - Cơ bản
- `intermediate` - Trung cấp  
- `advanced` - Nâng cao

---

## 💰 GIÁ

- Nhập số nguyên: `399000` (không có dấu phẩy)
- Đơn vị: VNĐ
- `originalPrice` > `price` để hiển thị giảm giá

---

## 🖼️ ẢNH

### Đường dẫn:
```
/images/courses/ten-file.jpg
```

### Đặt file:
```
frontend/public/images/courses/ten-file.jpg
```

### Kích thước khuyến nghị:
- 800x600px hoặc 1200x800px
- Định dạng: JPG, PNG
- Dung lượng: < 500KB

---

## ✅ KIỂM TRA

Sau khi thêm:
1. Refresh trang: http://localhost:5173
2. Vào trang Khóa học
3. Kiểm tra khóa học mới có hiển thị không

---

## 🔍 LẤY CATEGORY ID

### Cách 1: MongoDB Compass
1. Database: `elearning` → Collection: `categories`
2. Copy `_id` của category

### Cách 2: API
```
GET http://localhost:5000/api/categories
```

---

## 📞 GẶP VẤN ĐỀ?

### Lỗi "Category not found"
→ Kiểm tra CATEGORY_ID có đúng không

### Ảnh không hiển thị
→ Kiểm tra đường dẫn: `/images/courses/ten-file.jpg`
→ File có tồn tại trong `frontend/public/images/courses/`

### Không thấy khóa học
→ Kiểm tra `isActive: true`
→ Refresh trình duyệt (Ctrl + F5)

---

**Khuyến nghị:** Dùng lệnh `npm run seed` để thêm nhanh 6 khóa học mẫu! 🚀
