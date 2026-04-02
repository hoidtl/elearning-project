import { useState, useEffect } from 'react';
import { FiEye, FiCheck } from 'react-icons/fi';
import { orderAPI } from '../../services/api';
import { toast } from 'react-toastify';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async () => {
    try {
      const params = filterStatus ? { status: filterStatus } : {};
      const { data } = await orderAPI.getAll(params);
      setOrders(data.data.orders);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      toast.success('Đã cập nhật trạng thái đơn hàng');
      fetchOrders();
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái');
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
      <h1>Quản lý Đơn hàng</h1>

      {/* Filter */}
      <div className="admin-filters">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="shipping">Đang giao</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  Không có đơn hàng nào
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <strong>#{order._id.slice(-8)}</strong>
                  </td>
                  <td>
                    <div>
                      <div>{order.user?.name || 'N/A'}</div>
                      <small>{order.user?.email}</small>
                    </div>
                  </td>
                  <td>{order.orderItems.length} sản phẩm</td>
                  <td>
                    <strong>₫{order.totalPrice.toLocaleString('vi-VN')}</strong>
                  </td>
                  <td>
                    <span className={`payment-badge ${order.isPaid ? 'paid' : 'unpaid'}`}>
                      {order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <div className="action-buttons">
                      {order.status === 'pending' && (
                        <button
                          className="btn-icon btn-success"
                          onClick={() => handleUpdateStatus(order._id, 'confirmed')}
                          title="Xác nhận"
                        >
                          <FiCheck />
                        </button>
                      )}
                      {order.status === 'confirmed' && (
                        <button
                          className="btn-icon btn-info"
                          onClick={() => handleUpdateStatus(order._id, 'shipping')}
                          title="Giao hàng"
                        >
                          🚚
                        </button>
                      )}
                      {order.status === 'shipping' && (
                        <button
                          className="btn-icon btn-success"
                          onClick={() => handleUpdateStatus(order._id, 'completed')}
                          title="Hoàn thành"
                        >
                          <FiCheck />
                        </button>
                      )}
                      <button
                        className="btn-icon btn-view"
                        title="Xem chi tiết"
                      >
                        <FiEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
