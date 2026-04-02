import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    subcategory: searchParams.get('subcategory') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    level: searchParams.get('level') || '',
    sort: searchParams.get('sort') || 'createdAt',
    page: parseInt(searchParams.get('page')) || 1,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    if (filters.category) {
      fetchCategoryDetails();
      fetchSubcategories();
    }
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCategoryDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${filters.category}`);
      const data = await response.json();
      setCurrentCategory(data.data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${filters.category}/subcategories`);
      const data = await response.json();
      setSubcategories(data.data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      Object.keys(filters).forEach(key => {
        if (filters[key]) params[key] = filters[key];
      });

      const { data } = await productAPI.getAll(params);
      setProducts(data.data.products);
      setPagination(data.data.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    
    const params = {};
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) params[k] = newFilters[k];
    });
    setSearchParams(params);
  };

  const handleSubcategoryClick = (subcategory) => {
    handleFilterChange('subcategory', subcategory);
  };

  const handlePageChange = (page) => {
    setFilters({ ...filters, page });
    setSearchParams({ ...Object.fromEntries(searchParams), page });
  };

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    await addToCart(productId, 1);
    toast.success('Đã thêm vào giỏ hàng');
  };

  const handleAddToWishlist = async (e, productId) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    toast.info('Tính năng yêu thích đang phát triển');
  };

  const getPageTitle = () => {
    if (filters.subcategory) {
      return `Khóa học ${filters.subcategory}`;
    }
    if (currentCategory) {
      return `Khóa học ${currentCategory.name}`;
    }
    if (filters.search) {
      return `Kết quả tìm kiếm: "${filters.search}"`;
    }
    return 'Tất cả khóa học';
  };

  const getPageDescription = () => {
    if (filters.subcategory) {
      return `Khám phá các khóa học ${filters.subcategory} từ các chuyên gia giàu kinh nghiệm trong ngành giảng dạy`;
    }
    if (currentCategory) {
      return currentCategory.description || 'Khám phá các khóa học chất lượng cao từ các chuyên gia';
    }
    return 'Khám phá hàng nghìn khóa học chất lượng cao';
  };

  return (
    <div className="products-page">
      {/* Submenu nếu có subcategories */}
      {subcategories.length > 0 && (
        <div className="products-submenu">
          <div className="container">
            <div className="submenu-items">
              <button
                className={!filters.subcategory ? 'active' : ''}
                onClick={() => handleFilterChange('subcategory', '')}
              >
                Tất cả
              </button>
              {subcategories.map((sub, index) => (
                <button
                  key={index}
                  className={filters.subcategory === sub ? 'active' : ''}
                  onClick={() => handleSubcategoryClick(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container">
        {/* Page Header */}
        <div className="products-page-header">
          <h1>{getPageTitle()}</h1>
          <p>{getPageDescription()}</p>
        </div>

        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className="products-sidebar">
            {/* Rating Filter */}
            <div className="filter-group">
              <h3>Xếp hạng</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="radio" name="rating" value="4.5" onChange={(e) => handleFilterChange('minRating', e.target.value)} />
                  <span>⭐⭐⭐⭐⭐ Từ 4.5 trở lên</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="rating" value="4.0" onChange={(e) => handleFilterChange('minRating', e.target.value)} />
                  <span>⭐⭐⭐⭐ Từ 4.0 trở lên</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="rating" value="3.5" onChange={(e) => handleFilterChange('minRating', e.target.value)} />
                  <span>⭐⭐⭐ Từ 3.5 trở lên</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="rating" value="3.0" onChange={(e) => handleFilterChange('minRating', e.target.value)} />
                  <span>⭐⭐⭐ Từ 3.0 trở lên</span>
                </label>
              </div>
            </div>

            {/* Level Filter */}
            <div className="filter-group">
              <h3>Cấp độ</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" value="beginner" onChange={(e) => handleFilterChange('level', e.target.checked ? e.target.value : '')} />
                  <span>Beginner</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" value="intermediate" onChange={(e) => handleFilterChange('level', e.target.checked ? e.target.value : '')} />
                  <span>Intermediate</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" value="advanced" onChange={(e) => handleFilterChange('level', e.target.checked ? e.target.value : '')} />
                  <span>Advanced</span>
                </label>
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <h3>Giá</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="radio" name="price" onChange={() => { handleFilterChange('minPrice', ''); handleFilterChange('maxPrice', ''); }} />
                  <span>Tất cả</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="price" onChange={() => { handleFilterChange('minPrice', '0'); handleFilterChange('maxPrice', '500000'); }} />
                  <span>Dưới 500.000₫</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="price" onChange={() => { handleFilterChange('minPrice', '500000'); handleFilterChange('maxPrice', '1000000'); }} />
                  <span>500.000₫ - 1.000.000₫</span>
                </label>
                <label className="filter-option">
                  <input type="radio" name="price" onChange={() => { handleFilterChange('minPrice', '1000000'); handleFilterChange('maxPrice', ''); }} />
                  <span>Trên 1.000.000₫</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="products-main">
            {/* Sort and Filter Bar */}
            <div className="products-toolbar">
              <div className="products-count">
                {pagination.total || 0} kết quả
              </div>
              <div className="products-sort">
                <label>Sắp xếp theo</label>
                <select 
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="popular">Phổ biến nhất</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="createdAt">Mới nhất</option>
                  <option value="price_asc">Giá thấp đến cao</option>
                  <option value="price_desc">Giá cao đến thấp</option>
                </select>
              </div>
            </div>

            {/* Products List */}
            {loading ? (
              <Loading />
            ) : products.length === 0 ? (
              <div className="no-products">
                <p>Không tìm thấy khóa học nào</p>
              </div>
            ) : (
              <>
                <div className="products-list">
                  {products.map(product => (
                    <div key={product._id} className="product-list-item">
                      <img 
                        src={product.images?.[0] || '/placeholder.jpg'} 
                        alt={product.name}
                        className="product-list-image"
                        onClick={() => navigate(`/products/${product._id}`)}
                      />
                      <div className="product-list-content" onClick={() => navigate(`/products/${product._id}`)}>
                        <h3>{product.name}</h3>
                        <p className="product-list-description">
                          {product.description?.substring(0, 150)}...
                        </p>
                        <div className="product-list-meta">
                          <span className="instructor">{product.instructor}</span>
                        </div>
                        <div className="product-list-rating">
                          <span className="rating-value">{product.rating.toFixed(1)}</span>
                          <span className="stars">⭐⭐⭐⭐⭐</span>
                          <span className="reviews">({product.numReviews.toLocaleString('vi-VN')})</span>
                        </div>
                        <div className="product-list-info">
                          <span>Tổng số {product.duration || '10 giờ'}</span>
                          <span>•</span>
                          <span>{product.sold || 92} bài giảng</span>
                          <span>•</span>
                          <span>Tất cả các cấp độ</span>
                        </div>
                      </div>
                      <div className="product-list-price">
                        <span className="price">₫{product.price.toLocaleString('vi-VN')}</span>
                      </div>

                      {/* Hover Popup */}
                      <div className="product-list-hover">
                        <h4>{product.name}</h4>
                        <p className="hover-description">{product.description?.substring(0, 200)}...</p>
                        
                        {product.includes && product.includes.length > 0 && (
                          <div className="hover-includes">
                            <strong>Những kiến thức bạn sẽ học</strong>
                            <ul>
                              {product.includes.slice(0, 3).map((item, idx) => (
                                <li key={idx}>✓ {item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="hover-actions">
                          <button className="btn-add-cart" onClick={(e) => handleAddToCart(e, product._id)}>
                            Thêm vào giỏ hàng
                          </button>
                          <button className="btn-wishlist" onClick={(e) => handleAddToWishlist(e, product._id)}>
                            ♡
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="pagination">
                    <button
                      disabled={pagination.page === 1}
                      onClick={() => handlePageChange(pagination.page - 1)}
                    >
                      Trước
                    </button>
                    
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button
                        key={i + 1}
                        className={pagination.page === i + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      disabled={pagination.page === pagination.pages}
                      onClick={() => handlePageChange(pagination.page + 1)}
                    >
                      Sau
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
