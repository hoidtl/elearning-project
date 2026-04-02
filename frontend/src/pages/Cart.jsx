import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';

const Cart = () => {
  const { items, totalPrice, fetchCart, removeItem, loading } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Chuyển đến trang checkout để chọn phương thức thanh toán
    navigate('/checkout');
  };

  const handleRemoveItem = async (itemId) => {
    await removeItem(itemId);
    toast.success('Đã xóa khỏi giỏ hàng');
  };

  const handleSaveForLater = (itemId) => {
    toast.info('Tính năng lưu để sau đang phát triển');
  };

  const handleMoveToWishlist = (itemId) => {
    toast.info('Tính năng yêu thích đang phát triển');
  };

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Vui lòng đăng nhập để xem giỏ hàng</h2>
        <Link to="/login" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Đăng nhập
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  if (!items || items.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <FiShoppingCart size={80} style={{ color: 'var(--gray)', marginBottom: '1rem' }} />
        <h2>Giỏ hàng trống</h2>
        <p>Hãy thêm khóa học vào giỏ hàng để tiếp tục</p>
        <Link to="/products" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Khám phá khóa học
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-udemy">
      <div className="container">
        <h1 className="cart-title">Giỏ hàng</h1>
        <p className="cart-subtitle">{items.length} khóa học trong giỏ hàng</p>
        
        <div className="cart-layout">
          {/* Left - Cart Items */}
          <div className="cart-items-list">
            {items.map((item) => (
              <div key={item._id} className="cart-item-udemy">
                <img 
                  src={item.product?.images?.[0] || '/placeholder.jpg'} 
                  alt={item.product?.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.product?.name}</h3>
                  <p className="cart-item-instructor">Bởi {item.product?.instructor}</p>
                  <div className="cart-item-meta">
                    <span className="rating">
                      {item.product?.rating?.toFixed(1)} ⭐
                    </span>
                    <span>({item.product?.numReviews?.toLocaleString('vi-VN')} xếp hạng)</span>
                    <span>•</span>
                    <span>{item.product?.duration || '10 giờ'}</span>
                    <span>•</span>
                    <span>{item.product?.sold || 92} bài giảng</span>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => handleRemoveItem(item._id)} className="cart-action-link">
                      Xóa
                    </button>
                    <button onClick={() => handleSaveForLater(item._id)} className="cart-action-link">
                      Lưu để mua sau
                    </button>
                    <button onClick={() => handleMoveToWishlist(item._id)} className="cart-action-link">
                      Chuyển vào danh sách mong ước
                    </button>
                  </div>
                </div>
                <div className="cart-item-price">
                  ₫{item.price?.toLocaleString('vi-VN')}
                </div>
              </div>
            ))}
          </div>

          {/* Right - Summary */}
          <div className="cart-summary-udemy">
            <div className="summary-label">Tổng:</div>
            <div className="summary-total">₫{totalPrice?.toLocaleString('vi-VN')}</div>
            <button 
              className="btn-checkout-udemy"
              onClick={handleCheckout}
            >
              Tiến hành thanh toán
            </button>
            <button className="btn-coupon-udemy">
              Áp dụng coupon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
