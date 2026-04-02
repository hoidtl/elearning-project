# 📚 Hướng dẫn sử dụng Admin Dashboard

## 🔐 Truy cập Admin Dashboard

### Bước 1: Đăng nhập với tài khoản Admin
1. Mở trình duyệt và truy cập: `http://localhost:5173/login`
2. Đăng nhập với tài khoản có quyền admin
3. Sau khi đăng nhập, truy cập: `http://localhost:5173/admin`

### Bước 2: Tạo tài khoản Admin (nếu chưa có)
Bạn cần tạo user với role "admin" trong database:

```javascript
// Sử dụng MongoDB Compass hoặc mongosh
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

---

## 📊 Các tính năng Admin Dashboard

### 1. Dashboard (Trang chủ)
**URL:** `/admin`

**Chức năng:**
- Xem tổng quan thống kê:
  - Tổng doanh thu (từ đơn hàng hoàn thành)
  - Tổng số đơn hàng
  - Tổng số khóa học
  - Số lượng người dùng
- Xem danh sách đơn hàng gần đây
- Các thẻ thống kê với icon màu sắc trực quan

---

### 2. Quản lý Khóa học
**URL:** `/admin/products`

#### ✨ Tính năng:

**A. Xem danh sách khóa học**
- Hiển thị bảng với các cột:
  - Ảnh khóa học
  - Tên khóa học
  - Giảng viên
  - Giá (VNĐ)
  - Tồn kho
  - Đã bán
  - Đánh giá (sao + số lượng review)
  - Trạng thái (Hoạt động/Tạm dừng)
  - Thao tác (Sửa/Xóa)

**B. Tìm kiếm khóa học**
- Thanh tìm kiếm ở đầu trang
- Tìm theo tên khóa học

**C. Thêm khóa học mới**
1. Click nút "Thêm khóa học mới" (góc trên bên phải)
2. Điền form với các thông tin:

**Thông tin bắt buộc (*):**
- Tên khóa học
- Giá (VNĐ)
- Danh mục (chọn từ dropdown)
- Giảng viên

**Thông tin tùy chọn:**
- Mô tả
- Thời lượng (ví dụ: "10 giờ")
- Cấp độ (Beginner/Intermediate/Advanced/All Levels)
- Ngôn ngữ (mặc định: Tiếng Việt)
- Số lượng (mặc định: 100)
- Trạng thái (checkbox: Kích hoạt khóa học)
- Hình ảnh (hiện tại chỉ hỗ trợ URL)

3. Click "Thêm mới" để lưu

**D. Sửa khóa học**
1. Click icon ✏️ (Sửa) ở cột "Thao tác"
2. Form sẽ hiện ra với dữ liệu đã điền sẵn
3. Chỉnh sửa thông tin cần thiết
4. Click "Cập nhật" để lưu

**E. Xóa khóa học**
1. Click icon 🗑️ (Xóa) ở cột "Thao tác"
2. Xác nhận xóa trong popup
3. Khóa học sẽ bị xóa khỏi database

---

### 3. Quản lý Đơn hàng
**URL:** `/admin/orders`

#### ✨ Tính năng:

**A. Xem danh sách đơn hàng**
- Hiển thị bảng với các cột:
  - Mã đơn (8 ký tự cuối)
  - Khách hàng (tên + email)
  - Số lượng sản phẩm
  - Tổng tiền
  - Trạng thái thanh toán
  - Trạng thái đơn hàng
  - Ngày đặt
  - Thao tác

**B. Lọc đơn hàng theo trạng thái**
- Dropdown filter ở đầu trang:
  - Tất cả trạng thái
  - Chờ xác nhận
  - Đã xác nhận
  - Đang giao
  - Hoàn thành
  - Đã hủy

**C. Cập nhật trạng thái đơn hàng**

**Quy trình xử lý đơn:**
1. **Chờ xác nhận** → Click ✓ → **Đã xác nhận**
2. **Đã xác nhận** → Click 🚚 → **Đang giao**
3. **Đang giao** → Click ✓ → **Hoàn thành**

**Các trạng thái:**
- 🟡 **Chờ xác nhận** (Pending) - Đơn mới, chưa xử lý
- 🔵 **Đã xác nhận** (Confirmed) - Admin đã xác nhận
- 🟦 **Đang giao** (Shipping) - Đang vận chuyển
- 🟢 **Hoàn thành** (Completed) - Đã giao thành công
- 🔴 **Đã hủy** (Cancelled) - Đơn bị hủy

**D. Xem chi tiết đơn hàng**
- Click icon 👁️ (Xem) để xem chi tiết
- (Tính năng đang phát triển)

---

### 4. Quản lý Người dùng
**URL:** `/admin/users`

**Trạng thái:** Đang phát triển

**Tính năng dự kiến:**
- Xem danh sách người dùng
- Tìm kiếm/lọc người dùng
- Khóa/mở khóa tài khoản
- Xem lịch sử mua hàng
- Thống kê chi tiêu

---

### 5. Thống kê
**URL:** `/admin/analytics`

**Trạng thái:** Đang phát triển

**Tính năng dự kiến:**
- Biểu đồ doanh thu theo thời gian
- Top khóa học bán chạy
- Khóa học bán ít
- Thống kê tồn kho
- Báo cáo theo ngày/tháng/năm

---

### 6. Cài đặt
**URL:** `/admin/settings`

**Trạng thái:** Đang phát triển

**Tính năng dự kiến:**
- Cài đặt chung
- Cấu hình thanh toán
- Email templates
- Quản lý banner/slider

---

## 🎨 Giao diện Admin Dashboard

### Thiết kế:
- **Sidebar bên trái:** Menu điều hướng cố định
- **Content bên phải:** Nội dung chính
- **Màu sắc:** Tối giản, chuyên nghiệp
- **Responsive:** Tự động điều chỉnh trên mobile

### Màu sắc trạng thái:
- 🟡 Vàng: Chờ xử lý
- 🔵 Xanh dương: Đã xác nhận
- 🟢 Xanh lá: Hoàn thành
- 🔴 Đỏ: Hủy/Lỗi

---

## 🔧 Xử lý lỗi thường gặp

### Lỗi 1: Không thể truy cập /admin
**Nguyên nhân:** Tài khoản không có quyền admin

**Giải pháp:**
```javascript
// Cập nhật role trong MongoDB
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Lỗi 2: Không load được danh sách khóa học
**Nguyên nhân:** Backend chưa chạy hoặc chưa có dữ liệu

**Giải pháp:**
```bash
# Chạy seed data
cd backend
node src/utils/seedData.js
```

### Lỗi 3: Không thêm được khóa học mới
**Nguyên nhân:** Thiếu thông tin bắt buộc hoặc category chưa tồn tại

**Giải pháp:**
- Kiểm tra đã điền đầy đủ các trường bắt buộc (*)
- Chạy seed data để tạo categories

---

## 📝 Lưu ý quan trọng

### 1. Upload ảnh
- Hiện tại chỉ hỗ trợ nhập URL ảnh
- Tính năng upload file sẽ được bổ sung sau
- Đặt ảnh trong folder `frontend/public/images/courses/`
- Sử dụng đường dẫn: `/images/courses/ten-anh.jpg`

### 2. Xóa dữ liệu
- Xóa khóa học sẽ XÓA VĨNH VIỄN khỏi database
- Không thể khôi phục sau khi xóa
- Nên sử dụng tính năng "Tạm dừng" thay vì xóa

### 3. Cập nhật trạng thái đơn hàng
- Chỉ có thể cập nhật theo quy trình: Pending → Confirmed → Shipping → Completed
- Không thể quay lại trạng thái trước
- Đơn hàng "Hoàn thành" sẽ được tính vào doanh thu

### 4. Bảo mật
- Chỉ user có role "admin" mới truy cập được
- Đăng xuất khi không sử dụng
- Không chia sẻ tài khoản admin

---

## 🚀 Tính năng sắp ra mắt

### Phase 2:
- [ ] User Management (Quản lý người dùng)
- [ ] Analytics Dashboard (Biểu đồ thống kê)
- [ ] Settings Page (Trang cài đặt)
- [ ] Upload ảnh trực tiếp (Cloudinary integration)
- [ ] Export báo cáo Excel/PDF
- [ ] Quản lý mã giảm giá
- [ ] Quản lý banner/slider
- [ ] Quản lý blog/tin tức

### Phase 3:
- [ ] Real-time notifications
- [ ] Email automation
- [ ] Advanced analytics
- [ ] Role-based permissions
- [ ] Activity logs
- [ ] Backup & restore

---

## 💡 Tips & Tricks

### 1. Thêm khóa học nhanh
- Sử dụng seed data để tạo mẫu
- Copy thông tin từ khóa học có sẵn
- Chỉnh sửa thông tin cần thiết

### 2. Quản lý đơn hàng hiệu quả
- Sử dụng filter để xem đơn theo trạng thái
- Xử lý đơn "Chờ xác nhận" trước
- Cập nhật trạng thái đúng quy trình

### 3. Tối ưu hiệu suất
- Không tải quá nhiều khóa học cùng lúc
- Sử dụng tìm kiếm thay vì scroll
- Đóng modal sau khi hoàn thành

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console log (F12)
2. Xem file `backend/logs/` (nếu có)
3. Đọc lại hướng dẫn
4. Liên hệ team support

---

**Chúc bạn quản lý website thành công! 🎉**
