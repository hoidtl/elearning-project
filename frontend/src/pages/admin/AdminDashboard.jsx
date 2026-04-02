import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FiHome, FiPackage, FiShoppingBag, FiUsers, FiBarChart, FiSettings, FiFolder } from 'react-icons/fi';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import CategoryManagement from './CategoryManagement';

const AdminDashboard = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <Link 
            to="/admin" 
            className={`admin-nav-item ${isActive('/admin') && location.pathname === '/admin' ? 'active' : ''}`}
          >
            <FiHome /> Dashboard
          </Link>
          <Link 
            to="/admin/categories" 
            className={`admin-nav-item ${isActive('/admin/categories') ? 'active' : ''}`}
          >
            <FiFolder /> Danh mục
          </Link>
          <Link 
            to="/admin/products" 
            className={`admin-nav-item ${isActive('/admin/products') ? 'active' : ''}`}
          >
            <FiPackage /> Khóa học
          </Link>
          <Link 
            to="/admin/orders" 
            className={`admin-nav-item ${isActive('/admin/orders') ? 'active' : ''}`}
          >
            <FiShoppingBag /> Đơn hàng
          </Link>
          <Link 
            to="/admin/users" 
            className={`admin-nav-item ${isActive('/admin/users') ? 'active' : ''}`}
          >
            <FiUsers /> Người dùng
          </Link>
          <Link 
            to="/admin/analytics" 
            className={`admin-nav-item ${isActive('/admin/analytics') ? 'active' : ''}`}
          >
            <FiBarChart /> Thống kê
          </Link>
          <Link 
            to="/admin/settings" 
            className={`admin-nav-item ${isActive('/admin/settings') ? 'active' : ''}`}
          >
            <FiSettings /> Cài đặt
          </Link>
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="back-to-site">
            ← Về trang chủ
          </Link>
        </div>
      </aside>

      <main className="admin-content">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="users" element={<div className="admin-dashboard-content"><h1>Quản lý Người dùng</h1><p>Đang phát triển...</p></div>} />
          <Route path="analytics" element={<div className="admin-dashboard-content"><h1>Thống kê</h1><p>Đang phát triển...</p></div>} />
          <Route path="settings" element={<div className="admin-dashboard-content"><h1>Cài đặt</h1><p>Đang phát triển...</p></div>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
