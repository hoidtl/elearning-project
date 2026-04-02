# Hướng dẫn Loại học tập (Subcategories)

## Tính năng mới đã thêm

### 1. Menu danh mục màu TRẮNG
- Menu danh mục giờ có nền màu trắng thay vì đen
- Khi hover vào danh mục (ví dụ: CNTT), sẽ hiện dropdown với các loại học tập

### 2. Loại học tập (Subcategories)
- Mỗi khóa học có thể có "Loại học tập" cụ thể
- Ví dụ: Danh mục "CNTT" có thể có các loại:
  - Lập trình Web
  - Mobile
  - AI/Machine Learning
  - Data Science
  - DevOps
  - v.v.

### 3. Thêm loại học tập trong Admin

Khi thêm/sửa khóa học trong Admin:

1. Chọn **Danh mục** (bắt buộc)
2. Nhập **Loại học tập** (tùy chọn)
   - Ví dụ: "Lập trình Web", "Mobile", "AI"
   - Có thể để trống nếu không cần phân loại chi tiết

### 4. Hiển thị trên trang chủ

- Hover vào danh mục trong menu → Hiện dropdown
- Dropdown hiển thị:
  - Tên danh mục
  - Danh sách các loại học tập (nếu có)
  - Link "Xem tất cả khóa học [Tên danh mục]"

### 5. Lọc theo loại học tập

- Click vào loại học tập → Chuyển đến trang Products
- Tự động lọc khóa học theo danh mục + loại học tập
- URL: `/products?category=xxx&subcategory=Lập trình Web`

## Ví dụ sử dụng

### Danh mục: CNTT
- Loại học tập 1: Lập trình Web
- Loại học tập 2: Mobile Development
- Loại học tập 3: AI & Machine Learning

### Danh mục: Kinh doanh
- Loại học tập 1: Marketing
- Loại học tập 2: Quản lý dự án
- Loại học tập 3: Khởi nghiệp

## Lưu ý

- Loại học tập là tùy chọn, không bắt buộc
- Có thể nhập bất kỳ tên nào phù hợp với khóa học
- Hệ thống tự động gom nhóm các loại học tập giống nhau
- Nếu không có loại học tập nào, dropdown chỉ hiện link "Xem tất cả"

## Files đã cập nhật

1. `frontend/src/components/common/CategoryMenu.jsx` - Menu với subcategories
2. `frontend/src/pages/admin/ProductManagement.jsx` - Form thêm loại học tập
3. `frontend/src/styles/global.css` - CSS menu màu trắng
4. `backend/src/models/Product.js` - Thêm field subcategory
5. `backend/src/controllers/categoryController.js` - API lấy subcategories
6. `backend/src/controllers/productController.js` - Lọc theo subcategory
7. `backend/src/routes/categoryRoutes.js` - Route subcategories
8. `frontend/src/pages/Products.jsx` - Hỗ trợ lọc subcategory
