# 🔧 Sửa lỗi "language override unsupported"

## ❌ Lỗi gặp phải:
```
language override unsupported: Tiếng Việt
```

## 🔍 Nguyên nhân:
MongoDB text index không hỗ trợ ngôn ngữ "Tiếng Việt". Index cũ đang conflict với dữ liệu mới.

## ✅ Giải pháp:

### Bước 1: Xóa text index cũ
```bash
cd backend
node src/utils/dropTextIndex.js
```

### Bước 2: Khởi động lại backend
```bash
# Dừng backend (Ctrl+C)
npm run dev
```

### Bước 3: Thử thêm khóa học lại
1. Vào `http://localhost:5173/admin/products`
2. Click "Thêm khóa học mới"
3. Điền form đầy đủ
4. Click "Thêm mới"
5. ✅ Thành công!

---

## 🎯 Đã sửa gì?

### 1. Xóa text index
- Text index gây conflict với field `language`
- Không cần text index vì đã có search bằng regex

### 2. Giữ nguyên "Tiếng Việt"
- Hiển thị đẹp hơn "vietnamese"
- User-friendly

### 3. Tạo script tự động
- `dropTextIndex.js` - Xóa index cũ
- Chạy 1 lần là xong

---

## 🐛 Nếu vẫn lỗi:

### Cách 1: Xóa thủ công bằng MongoDB Compass
1. Mở MongoDB Compass
2. Chọn database `elearning`
3. Chọn collection `products`
4. Tab "Indexes"
5. Xóa index `name_text_description_text`
6. Khởi động lại backend

### Cách 2: Xóa bằng mongosh
```bash
mongosh

use elearning

db.products.dropIndex("name_text_description_text")

exit
```

### Cách 3: Xóa toàn bộ products và tạo lại
```bash
cd backend
node src/utils/seedData.js
```

---

## 📝 Lưu ý:

- Text index đã bị xóa khỏi model
- Search vẫn hoạt động bằng regex
- Không ảnh hưởng đến tính năng
- Chỉ cần chạy script 1 lần

---

## ✅ Checklist:

- [ ] Chạy `node src/utils/dropTextIndex.js`
- [ ] Khởi động lại backend
- [ ] Thử thêm khóa học
- [ ] Kiểm tra search vẫn hoạt động

---

**Hoàn thành!** 🎉
