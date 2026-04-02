import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiHeart, FiSearch, FiBell, FiGlobe } from 'react-icons/fi';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const cartCount = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <h2>E-Learning</h2>
        </Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/products" onClick={() => setIsOpen(false)}>Khóa học</Link>
        </div>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <FiSearch className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/wishlist" className="icon-btn" title="Danh sách yêu thích">
                <FiHeart size={22} />
              </Link>
              <Link to="/cart" className="icon-btn cart-btn" title="Giỏ hàng">
                <FiShoppingCart size={22} />
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </Link>
              <button className="icon-btn" title="Thông báo">
                <FiBell size={22} />
              </button>
              <div className="user-menu" ref={userMenuRef}>
                <button 
                  className="icon-btn user-menu-btn" 
                  title="Tài khoản"
                  onClick={toggleUserMenu}
                  onMouseEnter={() => setShowUserMenu(true)}
                >
                  <FiUser size={22} />
                </button>
                {showUserMenu && (
                  <div 
                    className="dropdown"
                    onMouseLeave={() => setShowUserMenu(false)}
                  >
                    <div className="dropdown-header">
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                    </div>
                    <Link to="/profile" onClick={() => { setIsOpen(false); setShowUserMenu(false); }}>Hồ sơ của tôi</Link>
                    <Link to="/orders" onClick={() => { setIsOpen(false); setShowUserMenu(false); }}>Đơn hàng của tôi</Link>
                    <Link to="/wishlist" onClick={() => { setIsOpen(false); setShowUserMenu(false); }}>Danh sách yêu thích</Link>
                    {user.role === 'admin' && (
                      <>
                        <div className="dropdown-divider"></div>
                        <Link to="/admin" onClick={() => { setIsOpen(false); setShowUserMenu(false); }}>Quản trị viên</Link>
                      </>
                    )}
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout}>Đăng xuất</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Đăng nhập</Link>
              <Link to="/register" className="btn-primary">Đăng ký</Link>
            </>
          )}
          
          <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
