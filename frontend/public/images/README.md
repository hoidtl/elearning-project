# 📸 HƯỚNG DẪN THÊM ẢNH CHO SLIDER

## Cách thêm ảnh:

1. **Đặt ảnh vào folder này:**
   ```
   frontend/public/images/
   ├── slide1.jpg
   ├── slide2.jpg
   └── slide3.jpg
   ```

2. **Mở file:** `frontend/src/components/common/HeroSlider.jsx`

3. **Tìm dòng có `image: null` và thay bằng:**
   ```javascript
   const slides = [
     {
       id: 1,
       title: 'Rất nhiều lợi ích',
       // ...
       image: '/images/slide1.jpg',  // ← Thay đổi ở đây
     },
     {
       id: 2,
       title: 'Học tập không giới hạn',
       // ...
       image: '/images/slide2.jpg',  // ← Thay đổi ở đây
     },
     {
       id: 3,
       title: 'Nâng cao kỹ năng',
       // ...
       image: '/images/slide3.jpg',  // ← Thay đổi ở đây
     },
   ];
   ```

4. **Lưu file và refresh trình duyệt**

## Kích thước ảnh khuyến nghị:

- **Chiều rộng:** 400-600px
- **Chiều cao:** 300-400px
- **Định dạng:** JPG, PNG, WebP
- **Dung lượng:** < 500KB

## Ví dụ:

Nếu bạn có file `banner1.png`, đặt vào folder này và sửa:
```javascript
image: '/images/banner1.png'
```

---

**Lưu ý:** Đường dẫn bắt đầu bằng `/images/` vì file nằm trong `public/images/`
