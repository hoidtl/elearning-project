import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';
import HeroSlider from '../components/common/HeroSlider';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await productAPI.getFeatured();
      setFeaturedProducts(data.data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Tại sao chọn chúng tôi?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">🎓</div>
              <h3>Chứng chỉ uy tín</h3>
              <p>Nhận chứng chỉ được công nhận sau khi hoàn thành khóa học</p>
            </div>
            <div className="feature-card">
              <div className="icon">💻</div>
              <h3>Học trực tuyến</h3>
              <p>Học mọi lúc, mọi nơi với thiết bị của bạn</p>
            </div>
            <div className="feature-card">
              <div className="icon">👨‍🏫</div>
              <h3>Giảng viên chuyên nghiệp</h3>
              <p>Học từ các chuyên gia hàng đầu trong ngành</p>
            </div>
            <div className="feature-card">
              <div className="icon">💰</div>
              <h3>Giá cả hợp lý</h3>
              <p>Khóa học chất lượng với mức giá phải chăng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <div className="container">
          <div className="section-header">
            <h2>Khóa học nổi bật</h2>
            <Link to="/products" className="view-all">Xem tất cả →</Link>
          </div>
          
          {loading ? (
            <Loading />
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Sẵn sàng bắt đầu học?</h2>
          <p>Tham gia cùng hàng nghìn học viên đang học tập mỗi ngày</p>
          <Link to="/register" className="btn-primary">Đăng ký ngay</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
