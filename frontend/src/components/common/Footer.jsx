import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>E-Learning</h3>
            <p>Nền tảng học trực tuyến hàng đầu Việt Nam với hàng nghìn khóa học chất lượng cao.</p>
            <div className="social-links">
              <a href="#"><FiFacebook size={20} /></a>
              <a href="#"><FiTwitter size={20} /></a>
              <a href="#"><FiInstagram size={20} /></a>
              <a href="#"><FiYoutube size={20} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Khóa học</h3>
            <ul>
              <li><Link to="/products?category=web">Lập trình Web</Link></li>
              <li><Link to="/products?category=mobile">Lập trình Mobile</Link></li>
              <li><Link to="/products?category=data">Data Science</Link></li>
              <li><Link to="/products?category=ai">AI & Machine Learning</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Về chúng tôi</h3>
            <ul>
              <li><Link to="/about">Giới thiệu</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
              <li><Link to="/careers">Tuyển dụng</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Hỗ trợ</h3>
            <ul>
              <li><Link to="/help">Trung tâm trợ giúp</Link></li>
              <li><Link to="/terms">Điều khoản sử dụng</Link></li>
              <li><Link to="/privacy">Chính sách bảo mật</Link></li>
              <li><Link to="/refund">Chính sách hoàn tiền</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 E-Learning Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
