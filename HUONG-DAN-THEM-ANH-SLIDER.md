# 🖼️ HƯỚNG DẪN THÊM ẢNH CHO SLIDER

## 📁 Cấu trúc folder

```
frontend/
├── public/
│   ├── images/           ← ĐẶT ẢNH VÀO ĐÂY
│   │   ├── slide1.jpg    ← Ảnh slide 1
│   │   ├── slide2.jpg    ← Ảnh slide 2
│   │   └── slide3.jpg    ← Ảnh slide 3
│   └── index.html
├── src/
│   └── components/
│       └── common/
│           └── HeroSlider.jsx  ← SỬA FILE NÀY
```

---

## 🎯 BƯỚC 1: Chuẩn bị ảnh

### Kích thước khuyến nghị:
- **Chiều rộng:** 400-600px
- **Chiều cao:** 300-400px
- **Tỷ lệ:** 4:3 hoặc 16:9
- **Định dạng:** JPG, PNG, WebP
- **Dung lượng:** < 500KB (để load nhanh)

### Đặt tên file:
```
slide1.jpg
slide2.jpg
slide3.jpg
```

Hoặc tên bất kỳ như:
```
banner-home.jpg
hero-image.png
learning-banner.jpg
```

---

## 🎯 BƯỚC 2: Copy ảnh vào folder

### Windows:
1. Mở folder: `F:\khoaluantotnghiep\frontend\public\images`
2. Copy/paste ảnh vào đây

### Hoặc dùng lệnh:
```powershell
# Copy ảnh từ Desktop vào project
Copy-Item "C:\Users\YourName\Desktop\slide1.jpg" "frontend\public\images\"
```

---

## 🎯 BƯỚC 3: Cập nhật code

Mở file: `frontend/src/components/common/HeroSlider.jsx`

Tìm phần này (khoảng dòng 10-40):

```javascript
const slides = [
  {
    id: 1,
    title: 'Rất nhiều lợi ích',
    description: '...',
    buttonText: 'Khám phá ngay',
    buttonLink: '/products',
    bgColor: '#a8dadc',
    image: null,  // ← THAY ĐỔI Ở ĐÂY
  },
  // ...
];
```

**Thay đổi thành:**

```javascript
const slides = [
  {
    id: 1,
    title: 'Rất nhiều lợi ích',
    description: '...',
    buttonText: 'Khám phá ngay',
    buttonLink: '/products',
    bgColor: '#a8dadc',
    image: '/images/slide1.jpg',  // ✅ ĐÃ THÊM ẢNH
  },
  {
    id: 2,
    title: 'Học tập không giới hạn',
    description: '...',
    buttonText: 'Bắt đầu học',
    buttonLink: '/products',
    bgColor: '#f1faee',
    image: '/images/slide2.jpg',  // ✅ ĐÃ THÊM ẢNH
  },
  {
    id: 3,
    title: 'Nâng cao kỹ năng',
    description: '...',
    buttonText: 'Xem khóa học',
    buttonLink: '/products',
    bgColor: '#e9c46a',
    image: '/images/slide3.jpg',  // ✅ ĐÃ THÊM ẢNH
  },
];
```

---

## 🎯 BƯỚC 4: Lưu và xem kết quả

1. **Lưu file** (Ctrl + S)
2. **Refresh trình duyệt** (Ctrl + F5)
3. **Xem slider** tại: http://localhost:5173

---

## ⚠️ LƯU Ý QUAN TRỌNG

### ✅ ĐÚNG:
```javascript
image: '/images/slide1.jpg'     // Bắt đầu bằng /images/
image: '/images/banner.png'
image: '/images/hero-bg.jpg'
```

### ❌ SAI:
```javascript
image: 'slide1.jpg'             // Thiếu /images/
image: './images/slide1.jpg'    // Không dùng ./
image: 'public/images/slide1.jpg' // Không dùng public
```

---

## 🎨 TÙY CHỈNH THÊM

### Thay đổi màu nền:
```javascript
bgColor: '#a8dadc',  // Màu xanh nhạt
bgColor: '#f1faee',  // Màu trắng kem
bgColor: '#e9c46a',  // Màu vàng
bgColor: '#e76f51',  // Màu cam
```

### Thay đổi text:
```javascript
title: 'Tiêu đề của bạn',
description: 'Mô tả chi tiết...',
buttonText: 'Nút bấm',
```

---

## 🔍 KIỂM TRA LỖI

### Nếu ảnh không hiển thị:

1. **Kiểm tra đường dẫn file:**
   ```
   frontend/public/images/slide1.jpg  ← File có tồn tại?
   ```

2. **Kiểm tra tên file:**
   - Có đúng chính tả không?
   - Có phân biệt hoa thường không?
   - `slide1.jpg` ≠ `Slide1.jpg` ≠ `SLIDE1.JPG`

3. **Kiểm tra trong code:**
   ```javascript
   image: '/images/slide1.jpg'  // Đúng tên file?
   ```

4. **Xem Console trong trình duyệt:**
   - Nhấn F12
   - Vào tab Console
   - Xem có lỗi 404 không?

---

## 📝 VÍ DỤ ĐẦY ĐỦ

```javascript
const slides = [
  {
    id: 1,
    title: 'Khóa học lập trình Web',
    description: 'Học HTML, CSS, JavaScript từ cơ bản đến nâng cao',
    buttonText: 'Đăng ký ngay',
    buttonLink: '/products?category=web',
    bgColor: '#667eea',
    image: '/images/web-development.jpg',
  },
  {
    id: 2,
    title: 'Khóa học Data Science',
    description: 'Phân tích dữ liệu với Python và Machine Learning',
    buttonText: 'Tìm hiểu thêm',
    buttonLink: '/products?category=data',
    bgColor: '#f093fb',
    image: '/images/data-science.png',
  },
];
```

---

**Chúc bạn thành công!** 🎉

Nếu gặp vấn đề, hãy kiểm tra lại từng bước hoặc xem Console log trong trình duyệt.
