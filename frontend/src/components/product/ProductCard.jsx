import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiClock, FiBarChart } from 'react-icons/fi';
import useCartStore from '../../store/cartStore';
import useAuthStore from '../../store/authStore';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const { user } = useAuthStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      window.location.href = '/login';
      return;
    }
    await addToCart(product._id, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Add to wishlist
  };

  return (
    <Link 
      to={`/products/${product._id}`} 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image">
        <img 
          src={product.images?.[0] || '/placeholder.jpg'} 
          alt={product.name}
        />
        {product.originalPrice && (
          <span className="discount-badge">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="product-overlay">
            <h4>{product.name}</h4>
            <p className="overlay-description">
              {product.description?.substring(0, 150)}...
            </p>
            <div className="overlay-features">
              {product.features?.slice(0, 3).map((feature, index) => (
                <div key={index} className="overlay-feature-item">
                  ✓ {feature}
                </div>
              ))}
            </div>
            <div className="overlay-actions">
              <button className="btn-overlay-cart" onClick={handleAddToCart}>
                Thêm vào giỏ
              </button>
              <button className="btn-overlay-wishlist" onClick={handleWishlist}>
                <FiHeart />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="product-info">
        {product.isFeatured && (
          <span className="bestseller-badge">Bán chạy nhất</span>
        )}
        
        <h3 className="product-name">{product.name}</h3>
        
        <p className="product-instructor">{product.instructor}</p>

        <div className="product-rating">
          <span className="rating-number">{product.rating.toFixed(1)}</span>
          <FiStar className="star-icon" size={14} />
          <span className="reviews-count">({product.numReviews})</span>
        </div>

        <div className="product-footer">
          <div className="product-price">
            <span className="current-price">
              ₫{product.price.toLocaleString('vi-VN')}
            </span>
            {product.originalPrice && (
              <span className="original-price">
                ₫{product.originalPrice.toLocaleString('vi-VN')}
              </span>
            )}
          </div>
        </div>

        {product.level && (
          <div className="product-meta">
            <span><FiBarChart size={12} /> {product.level === 'beginner' ? 'Cơ bản' : product.level === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}</span>
            {product.duration && <span><FiClock size={12} /> {product.duration}</span>}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
