import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiClock, FiBarChart2, FiGlobe, FiPlay, FiFile, FiDownload, FiSmartphone, FiAward } from 'react-icons/fi';
import { productAPI } from '../services/api';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import Loading from '../components/common/Loading';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await productAPI.getById(id);
      setProduct(data.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Không tìm thấy khóa học');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    await addToCart(product._id, 1);
    toast.success('Đã thêm vào giỏ hàng');
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const itemsPrice = product.price;
      const shippingPrice = 0; // Khóa học online không có phí ship
      const taxPrice = 0;
      const totalPrice = itemsPrice + shippingPrice + taxPrice;

      // Tạo order trực tiếp
      const orderData = {
        orderItems: [{
          product: product._id,
          name: product.name,
          quantity: 1,
          image: product.images?.[0],
          price: product.price,
        }],
        shippingAddress: {
          fullName: user.name || user.email,
          phone: user.phone || '0000000000',
          address: 'Online Course',
          city: 'Online',
        },
        paymentMethod: 'vnpay',
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      const token = localStorage.getItem('accessToken');
      const orderResponse = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const orderResult = await orderResponse.json();

      if (orderResult.success) {
        // Tạo payment URL VNPay
        const paymentResponse = await fetch('http://localhost:5000/api/payment/vnpay/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderId: orderResult.data._id,
            amount: totalPrice,
            orderInfo: `Thanh toan khoa hoc ${product.name}`,
            bankCode: '',
          }),
        });

        const paymentData = await paymentResponse.json();

        if (paymentData.success) {
          // Redirect đến VNPay sandbox
          window.location.href = paymentData.data.paymentUrl;
        } else {
          toast.error('Không thể tạo thanh toán');
        }
      } else {
        toast.error(orderResult.message || 'Không thể tạo đơn hàng');
        console.error('Order error:', orderResult);
      }
    } catch (error) {
      console.error('Buy now error:', error);
      toast.error('Có lỗi xảy ra');
    }
  };

  if (loading) return <Loading />;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div className="product-detail-page">
      {/* Hero Section - Dark Background */}
      <div className="product-hero">
        <div className="container">
          <div className="product-hero-content">
            <div className="breadcrumb">
              <span>Phát triển</span> › <span>Ngôn ngữ lập trình</span> › <span>{product.category?.name}</span>
            </div>
            
            <h1>{product.name}</h1>
            <p className="product-subtitle">{product.description?.substring(0, 150)}</p>
            
            <div className="product-meta-row">
              <span className="bestseller-badge">Xếp hạng cao nhất</span>
              <div className="rating-info">
                <span className="rating-value">{product.rating.toFixed(1)}</span>
                <span className="stars">⭐⭐⭐⭐⭐</span>
                <span className="rating-link">({product.numReviews.toLocaleString('vi-VN')} xếp hạng)</span>
              </div>
              <span className="students-count">{product.sold.toLocaleString('vi-VN')} học viên</span>
            </div>

            <div className="product-author">
              Được tạo bởi <a href="#">{product.instructor}</a>
            </div>

            <div className="product-info-icons">
              <span><FiClock /> Cập nhật gần đây nhất 3/2017</span>
              <span><FiGlobe /> {product.language}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="product-layout">
          {/* Left Column */}
          <div className="product-main">
            {/* What you'll learn */}
            {product.includes && product.includes.length > 0 && (
              <div className="learning-box">
                <h2>Những kiến thức bạn sẽ học</h2>
                <div className="learning-grid">
                  {product.includes.map((item, idx) => (
                    <div key={idx} className="learning-item">
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum */}
            {product.curriculum && product.curriculum.length > 0 && (
              <div className="curriculum-section">
                <h2>Nội dung bài học</h2>
                <div className="curriculum-simple-list">
                  <ul>
                    {product.curriculum.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Requirements */}
            {product.requirements && product.requirements.length > 0 && (
              <div className="requirements-section">
                <h2>Yêu cầu</h2>
                <ul>
                  {product.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            <div className="description-section">
              <h2>Mô tả</h2>
              <p>{product.description}</p>
            </div>
          </div>

          {/* Right Sidebar - Sticky Card */}
          <div className="product-sidebar">
            <div className="product-card-sticky">
              <img 
                src={product.images?.[0] || '/placeholder.jpg'} 
                alt={product.name}
                className="card-image"
              />
              
              <div className="card-content">
                <div className="card-price">
                  ₫{product.price.toLocaleString('vi-VN')}
                </div>

                <button className="btn-add-to-cart" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </button>
                
                <button className="btn-buy-now" onClick={handleBuyNow}>
                  Mua ngay
                </button>

                <div className="card-info">
                  <h3>Khóa học này bao gồm:</h3>
                  <ul className="includes-list">
                    <li><FiClock /> {product.duration} video theo yêu cầu</li>
                    <li><FiFile /> 4 bài tập coding</li>
                    <li><FiDownload /> 2 bài viết</li>
                    <li><FiDownload /> Truy cập trên thiết bị di động và TV</li>
                    <li><FiAward /> Giấy chứng nhận hoàn thành</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
