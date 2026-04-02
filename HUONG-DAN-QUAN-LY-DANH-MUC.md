# 📁 Hướng dẫn Quản lý Danh mục

## 🎯 Tổng quan

Trang quản lý danh mục cho phép bạn tạo, sửa, xóa các loại khóa học như:
- Lập trình Web
- Lập trình Mobile  
- Data Science
- AI & Machine Learning
- Cloud Computing
- v.v.

---

## 🌐 Truy cập

```
http://localhost:5173/admin/categories
```

Hoặc từ Admin Dashboard → Click "Danh mục" trong sidebar

---

## ✨ Tính năng

### 1. Xem danh sách danh mục

Hiển thị dạng **Grid Cards** với thông tin:
- Tên danh mục
- Mô tả
- Trạng thái (Hoạt động/Tạm dừng)
- Số lượng khóa học
- Nút Sửa/Xóa

### 2. Thêm danh mục mới

**Bước 1:** Click nút "Thêm danh mục mới"

**Bước 2:** Điền form:
- **Tên danh mục** (*bắt buộc): Ví dụ "Lập trình Web"
- **Mô tả**: Mô tả ngắn về danh mục
- **Trạng thái**: ☑ Kích hoạt danh mục

**Bước 3:** Click "Thêm mới"

### 3. Sửa danh mục

**Bước 1:** Click icon ✏️ (Sửa) trên card danh mục

**Bước 2:** Form hiện ra với dữ liệu đã điền sẵn

**Bước 3:** Chỉnh sửa thông tin

**Bước 4:** Click "Cập nhật"

### 4. Xóa danh mục

**Bước 1:** Click icon 🗑️ (Xóa) trên card danh mục

**Bước 2:** Xác nhận xóa trong popup

**⚠️ Lưu ý:** 
- Xóa danh mục KHÔNG xóa khóa học
- Các khóa học trong danh mục này sẽ không có danh mục
- Nên "Tạm dừng" thay vì xóa

---

## 🎨 Giao diện

```
┌─────────────────────────────────────────────────────────┐
│  Quản lý Danh mục              [+ Thêm danh mục mới]    │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Lập trình Web│  │ Data Science │  │ Mobile Dev   │  │
│  │ 🟢 Hoạt động │  │ 🟢 Hoạt động │  │ 🔴 Tạm dừng  │  │
│  │              │  │              │  │              │  │
│  │ Các khóa học │  │ Khoa học dữ  │  │ Phát triển   │  │
│  │ về phát triển│  │ liệu và phân │  │ ứng dụng di  │  │
│  │ web...       │  │ tích...      │  │ động...      │  │
│  │              │  │              │  │              │  │
│  │ 📚 12 khóa   │  │ 📚 8 khóa    │  │ 📚 5 khóa    │  │
│  │ ✏️ 🗑️        │  │ ✏️ 🗑️        │  │ ✏️ 🗑️        │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Ví dụ danh mục

### Danh mục phổ biến:

1. **Lập trình Web**
   - Mô tả: Các khóa học về phát triển web frontend và backend

2. **Lập trình Mobile**
   - Mô tả: Phát triển ứng dụng di động iOS và Android

3. **Data Science**
   - Mô tả: Khoa học dữ liệu và phân tích dữ liệu

4. **AI & Machine Learning**
   - Mô tả: Trí tuệ nhân tạo và học máy

5. **Cloud Computing**
   - Mô tả: Điện toán đám mây AWS, Azure, Google Cloud

6. **DevOps**
   - Mô tả: CI/CD, Docker, Kubernetes, automation

7. **Blockchain**
   - Mô tả: Công nghệ blockchain và cryptocurrency

8. **Game Development**
   - Mô tả: Phát triển game với Unity, Unreal Engine

9. **UI/UX Design**
   - Mô tả: Thiết kế giao diện và trải nghiệm người dùng

10. **Cybersecurity**
    - Mô tả: An ninh mạng và bảo mật thông tin

---

## 🔗 Liên kết với Khóa học

### Khi thêm khóa học:
1. Vào **Quản lý Khóa học**
2. Click "Thêm khóa học mới"
3. Chọn **Danh mục** từ dropdown
4. Danh mục sẽ tự động liên kết

### Hiển thị trên trang chủ:
- Chỉ danh mục **Hoạt động** mới hiển thị
- Danh mục **Tạm dừng** sẽ ẩn

---

## ⚙️ API Endpoints

### GET - Lấy danh sách
```
GET http://localhost:5000/api/categories
```

### POST - Thêm mới
```
POST http://localhost:5000/api/categories
Body: {
  "name": "Lập trình Web",
  "description": "Các khóa học về web",
  "isActive": true
}
```

### PUT - Cập nhật
```
PUT http://localhost:5000/api/categories/:id
Body: {
  "name": "Lập trình Web Updated",
  "description": "Mô tả mới",
  "isActive": true
}
```

### DELETE - Xóa
```
DELETE http://localhost:5000/api/categories/:id
```

---

## 🐛 Xử lý lỗi

### Lỗi: "Không tải được danh sách"
**Nguyên nhân:** Backend chưa chạy hoặc API lỗi

**Giải pháp:**
```bash
# Kiểm tra backend
cd backend
npm run dev

# Kiểm tra API
curl http://localhost:5000/api/categories
```

### Lỗi: "Không thêm được danh mục"
**Nguyên nhân:** Thiếu tên danh mục hoặc trùng tên

**Giải pháp:**
- Kiểm tra đã nhập tên chưa
- Đổi tên khác nếu bị trùng

### Lỗi: "Không xóa được danh mục"
**Nguyên nhân:** Danh mục đang được sử dụng

**Giải pháp:**
- Chuyển khóa học sang danh mục khác
- Hoặc "Tạm dừng" thay vì xóa

---

## 💡 Tips

### 1. Đặt tên danh mục
- Ngắn gọn, dễ hiểu
- Không quá 50 ký tự
- Viết hoa chữ cái đầu

### 2. Mô tả danh mục
- 1-2 câu ngắn
- Nêu rõ nội dung chính
- Không quá 200 ký tự

### 3. Quản lý hiệu quả
- Tạo danh mục trước khi thêm khóa học
- Nhóm khóa học theo chủ đề rõ ràng
- Dùng "Tạm dừng" thay vì xóa

### 4. SEO friendly
- Tên danh mục có từ khóa
- Mô tả có thông tin hữu ích
- URL thân thiện

---

## 📊 Thống kê

### Xem số lượng khóa học:
- Hiển thị trên mỗi card danh mục
- Cập nhật tự động khi thêm/xóa khóa học

### Danh mục phổ biến:
- Xem trong trang **Thống kê** (đang phát triển)
- Sắp xếp theo số lượng khóa học

---

## ✅ Checklist

Khi tạo danh mục mới:
- [ ] Tên danh mục rõ ràng
- [ ] Mô tả đầy đủ
- [ ] Trạng thái "Hoạt động"
- [ ] Kiểm tra không trùng tên
- [ ] Test hiển thị trên trang chủ

---

## 🎯 Workflow hoàn chỉnh

```
1. Tạo danh mục
   ↓
2. Thêm khóa học vào danh mục
   ↓
3. Khóa học hiển thị theo danh mục
   ↓
4. User lọc khóa học theo danh mục
   ↓
5. Thống kê theo danh mục
```

---

## 🚀 Tính năng sắp ra mắt

- [ ] Sắp xếp thứ tự danh mục
- [ ] Icon cho mỗi danh mục
- [ ] Màu sắc tùy chỉnh
- [ ] Danh mục con (subcategory)
- [ ] Import/Export danh mục
- [ ] Thống kê chi tiết

---

**Chúc bạn quản lý danh mục hiệu quả!** 📁✨
