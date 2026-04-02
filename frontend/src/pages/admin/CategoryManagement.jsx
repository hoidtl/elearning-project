import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách danh mục');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      isActive: true,
    });
    setEditingCategory(null);
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || '',
        isActive: category.isActive !== undefined ? category.isActive : true,
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Vui lòng nhập tên danh mục');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const url = editingCategory
        ? `http://localhost:5000/api/categories/${editingCategory._id}`
        : 'http://localhost:5000/api/categories';

      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save category');
      }

      toast.success(editingCategory ? 'Đã cập nhật danh mục' : 'Đã thêm danh mục mới');
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || (editingCategory ? 'Lỗi khi cập nhật danh mục' : 'Lỗi khi thêm danh mục'));
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa danh mục này? Tất cả khóa học trong danh mục này sẽ không có danh mục.')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete category');
      }

      toast.success('Đã xóa danh mục');
      fetchCategories();
    } catch (error) {
      toast.error(error.message || 'Lỗi khi xóa danh mục');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="admin-dashboard-content">
      <div className="admin-header">
        <h1>Quản lý Danh mục</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <FiPlus /> Thêm danh mục mới
        </button>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {categories.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📁</div>
            <h3>Chưa có danh mục nào</h3>
            <p>Thêm danh mục đầu tiên để bắt đầu</p>
            <button className="btn-primary" onClick={() => handleOpenModal()}>
              <FiPlus /> Thêm danh mục
            </button>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="category-card">
              <div className="category-card-header">
                <h3>{category.name}</h3>
                <span className={`status-badge ${category.isActive ? 'status-completed' : 'status-cancelled'}`}>
                  {category.isActive ? 'Hoạt động' : 'Tạm dừng'}
                </span>
              </div>
              <p className="category-description">
                {category.description || 'Chưa có mô tả'}
              </p>
              <div className="category-card-footer">
                <div className="category-stats">
                  <span>📚 {category.productCount || 0} khóa học</span>
                </div>
                <div className="action-buttons">
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => handleOpenModal(category)}
                    title="Sửa"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(category._id)}
                    title="Xóa"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên danh mục *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Lập trình Web"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Mô tả ngắn về danh mục này..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="isActive">Kích hoạt danh mục</label>
                </div>
                <small>Danh mục không hoạt động sẽ không hiển thị trên trang chủ</small>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  {editingCategory ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
