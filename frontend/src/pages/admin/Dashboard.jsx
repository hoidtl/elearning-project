import { useState, useEffect } from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiBook } from 'react-icons/fi';
import { orderAPI, productAPI } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch orders
      const { data: ordersData } = await orderAPI.getAll({ limit: 5 });
      setRecentOrders(ordersData.data.orders);

      // Fetch products
      const { data: productsData } = await productAPI.getAll({ limit: 1 });

      // Calculate stats
      const totalRevenue = ordersData.data.orders
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + order.totalPrice, 0);

      setStats({
        totalRevenue,
        totalOrders: ordersData.data.pagination.total,
        totalProducts: productsData.data.pagination.total,
        totalUsers: 0, // TODO: Add user count API
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      shipping: 'Đang giao',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy',
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const classMap = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      shipping: 'status-shipping',
      completed: 'status-completed',
      cancelled: 'status-cancelled',
    };
    return classMap[status] || '';
  };

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="admin-dashboard-content">
      <h1>Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>
            <FiDollarSign size={24} color="#1976d2" />
          </div>
          <div className="stat-info">
            <h3>Tổng doanh thu</h3>
            <p className="stat-value">₫{stats.totalRevenue.toLocaleString('vi-VN')}</p>
            <span className="stat-label">Từ đơn hàng hoàn thành</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f3e5f5' }}>
            <FiShoppingBag size={24} color="#7b1fa2" />
          </div>
          <div className="stat-info">
            <h3>Tổng đơn hàng</h3>
            <p className="stat-value">{stats.totalOrders}</p>
            <span className="stat-label">Tất cả đơn hàng</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e8f5e9' }}>
            <FiBook size={24} color="#388e3c" />
          </div>
          <div className="stat-info">
            <h3>Tổng khóa học</h3>
            <p className="stat-value">{stats.totalProducts}</p>
            <span className="stat-label">Đang hoạt động</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#fff3e0' }}>
            <FiUsers size={24} color="#f57c00" />
          </div>
          <div className="stat-info">
            <h3>Người dùng</h3>
            <p className="stat-value">{stats.totalUsers || 'N/A'}</p>
            <span className="stat-label">Đã đăng ký</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="admin-section">
        <h2>Đơn hàng gần đây</h2>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    Chưa có đơn hàng nào
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-8)}</td>
                    <td>{order.user?.name || 'N/A'}</td>
                    <td>₫{order.totalPrice.toLocaleString('vi-VN')}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
