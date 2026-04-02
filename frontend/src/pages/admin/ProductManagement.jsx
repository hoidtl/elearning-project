import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX, FiUpload } from 'react-icons/fi';
import { productAPI } from '../../services/api';
import { toast } from 'react-toastify';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    instructor: '',
    duration: '',
    level: 'beginner',
    language: 'Tiếng Việt',
    images: [],
    curriculum: [],
    includes: [],
    isActive: true,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await productAPI.getAll({ limit: 100 });
      setProducts(data.data.products);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách khóa học');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const uploadedPaths = [];

      for (const file of files) {
        const formDataUpload = new FormData();
        formDataUpload.append('image', file);

        const response = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formDataUpload,
        });

        const data = await response.json();

        if (response.ok) {
          uploadedPaths.push(data.data.path);
        } else {
          throw new Error(data.message || 'Upload failed');
        }
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedPaths]
      }));

      toast.success(`Đã upload ${uploadedPaths.length} ảnh`);
    } catch (error) {
      toast.error(error.message || 'Lỗi khi upload ảnh');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Curriculum handlers
  const addCurriculum = () => {
    setFormData(prev => ({
      ...prev,
      curriculum: [...prev.curriculum, '']
    }));
  };

  const removeCurriculum = (index) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.filter((_, i) => i !== index)
    }));
  };

  const updateCurriculum = (index, value) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map((item, i) => i === index ? value : item)
    }));
  };

  // Includes handlers
  const addInclude = () => {
    setFormData(prev => ({
      ...prev,
      includes: [...prev.includes, '']
    }));
  };

  const removeInclude = (index) => {
    setFormData(prev => ({
      ...prev,
      includes: prev.includes.filter((_, i) => i !== index)
    }));
  };

  const updateInclude = (index, value) => {
    setFormData(prev => ({
      ...prev,
      includes: prev.includes.map((item, i) => i === index ? value : item)
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      subcategory: '',
      instructor: '',
      duration: '',
      level: 'beginner',
      language: 'Tiếng Việt',
      images: [],
      curriculum: [],
      includes: [],
      isActive: true,
    });
    setEditingProduct(null);
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category?._id || product.category || '',
        subcategory: product.subcategory || '',
        instructor: product.instructor,
        duration: product.duration || '',
        level: product.level || 'beginner',
        language: product.language || 'Tiếng Việt',
        images: product.images || [],
        curriculum: product.curriculum || [],
        includes: product.includes || [],
        isActive: product.isActive !== undefined ? product.isActive : true,
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

    // Validation
    if (!formData.name || !formData.price || !formData.category || !formData.instructor) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (!formData.description) {
      toast.error('Vui lòng nhập mô tả khóa học');
      return;
    }

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: 100, // Mặc định 100 cho khóa học online
      };

      if (editingProduct) {
        await productAPI.update(editingProduct._id, productData);
        toast.success('Đã cập nhật khóa học');
      } else {
        await productAPI.create(productData);
        toast.success('Đã thêm khóa học mới');
      }

      fetchProducts();
      handleCloseModal();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Có lỗi xảy ra';
      toast.error(editingProduct ? `Lỗi khi cập nhật: ${errorMessage}` : `Lỗi khi thêm khóa học: ${errorMessage}`);
      console.error('Error:', error);
      console.error('Error response:', error.response?.data);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa khóa học này?')) return;

    try {
      await productAPI.delete(id);
      toast.success('Đã xóa khóa học');
      fetchProducts();
    } catch (error) {
      toast.error('Lỗi khi xóa khóa học');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="admin-dashboard-content">
      <div className="admin-header">
        <h1>Quản lý Khóa học</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <FiPlus /> Thêm khóa học mới
        </button>
      </div>

      {/* Search */}
      <div className="admin-search">
        <FiSearch />
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên khóa học</th>
              <th>Loại học tập</th>
              <th>Giảng viên</th>
              <th>Giá</th>
              <th>Đã bán</th>
              <th>Đánh giá</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>
                  Không tìm thấy khóa học nào
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.images?.[0] || '/placeholder.jpg'}
                      alt={product.name}
                      className="product-thumb"
                    />
                  </td>
                  <td>
                    <strong>{product.name}</strong>
                  </td>
                  <td>
                    <span style={{ fontSize: '13px', color: '#6a6f73' }}>
                      {product.subcategory || '-'}
                    </span>
                  </td>
                  <td>{product.instructor}</td>
                  <td>₫{product.price.toLocaleString('vi-VN')}</td>
                  <td>{product.sold}</td>
                  <td>
                    ⭐ {product.rating.toFixed(1)} ({product.numReviews})
                  </td>
                  <td>
                    <span className={`status-badge ${product.isActive ? 'status-completed' : 'status-cancelled'}`}>
                      {product.isActive ? 'Hoạt động' : 'Tạm dừng'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-icon btn-edit"
                        onClick={() => handleOpenModal(product)}
                        title="Sửa"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="btn-icon btn-delete"
                        onClick={() => handleDelete(product._id)}
                        title="Xóa"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Sửa khóa học' : 'Thêm khóa học mới'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Basic Info */}
              <div className="form-group">
                <label>Tên khóa học *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Lập trình React từ cơ bản đến nâng cao"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mô tả *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Mô tả chi tiết về khóa học..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giá (VNĐ) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="299000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Danh mục *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Loại học tập</label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Lập trình Web, Mobile, AI..."
                />
                <small>Nhập loại học tập cụ thể trong danh mục (tùy chọn)</small>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giảng viên *</label>
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    placeholder="Tên giảng viên"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Thời lượng</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: 10 giờ"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Cấp độ</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Ngôn ngữ</label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    placeholder="Tiếng Việt"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="isActive">Kích hoạt khóa học</label>
                </div>
              </div>

              {/* Image Upload */}
              <div className="form-group">
                <label>Hình ảnh khóa học</label>
                <div className="image-upload">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={uploading}
                  />
                  <label htmlFor="imageUpload" className="image-upload-label">
                    <FiUpload className="image-upload-icon" />
                    <span>{uploading ? 'Đang upload...' : 'Click để tải ảnh lên'}</span>
                    <small>Hỗ trợ: JPG, PNG, GIF, WEBP (tối đa 5MB)</small>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="image-preview">
                    {formData.images.map((img, index) => (
                      <div key={index} className="image-preview-item">
                        <img src={img} alt={`Preview ${index + 1}`} onError={(e) => e.target.src = '/placeholder.jpg'} />
                        <button
                          type="button"
                          className="image-preview-remove"
                          onClick={() => removeImage(index)}
                          disabled={uploading}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Curriculum Builder */}
              <div className="form-group">
                <label>Nội dung bài học</label>
                <div className="includes-builder">
                  {formData.curriculum.map((item, idx) => (
                    <div key={idx} className="include-item">
                      <input
                        type="text"
                        placeholder="VD: Giới thiệu về React và JSX"
                        value={item}
                        onChange={(e) => updateCurriculum(idx, e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn-icon btn-delete"
                        onClick={() => removeCurriculum(idx)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={addCurriculum}
                  >
                    <FiPlus /> Thêm nội dung
                  </button>
                </div>
              </div>

              {/* Includes Builder */}
              <div className="form-group">
                <label>Khóa học này bao gồm</label>
                <div className="includes-builder">
                  {formData.includes.map((item, idx) => (
                    <div key={idx} className="include-item">
                      <input
                        type="text"
                        placeholder="VD: 10 giờ video theo yêu cầu"
                        value={item}
                        onChange={(e) => updateInclude(idx, e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn-icon btn-delete"
                        onClick={() => removeInclude(idx)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={addInclude}
                  >
                    <FiPlus /> Thêm mục
                  </button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
