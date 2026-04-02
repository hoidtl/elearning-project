import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCartStore from '../store/cartStore';
import { orderAPI } from '../services/api';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('momo');

  const handlePayment = async () => {
    if (!selectedPayment) {
      toast.error('Vui lòng chọn phương thức thanh toán');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        orderItems: items.map(item => ({
          product: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          image: item.product.images?.[0],
          price: item.price,
        })),
        shippingAddress: {
          fullName: 'Online Course',
          phone: '0000000000',
          address: 'Online',
          city: 'Online',
        },
        paymentMethod: selectedPayment,
      };

      const { data } = await orderAPI.create(orderData);
      
      if (selectedPayment === 'momo') {
        const paymentResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/payment/momo/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            orderId: data.data._id,
            amount: totalPrice,
            orderInfo: `Thanh toan khoa hoc ${data.data._id}`,
          }),
        });

        const paymentData = await paymentResponse.json();
        
        if (paymentData.success) {
          window.location.href = paymentData.data.paymentUrl;
        } else {
          toast.error('Không thể tạo thanh toán MoMo');
        }
      } else if (selectedPayment === 'vnpay') {
        const paymentResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/payment/vnpay/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            orderId: data.data._id,
            amount: totalPrice,
            orderInfo: `Thanh toan khoa hoc ${data.data._id}`,
            bankCode: '',
          }),
        });

        const paymentData = await paymentResponse.json();
        
        if (paymentData.success) {
          window.location.href = paymentData.data.paymentUrl;
        } else {
          toast.error('Không thể tạo thanh toán VNPay');
        }
      } else {
        toast.success('Đặt hàng thành công!');
        clearCart();
        navigate('/orders');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đặt hàng thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-simple">
      <div className="container">
        <div className="checkout-card">
          <h1>Chọn phương thức thanh toán</h1>
          <p className="checkout-subtitle">Tổng thanh toán: <strong>{totalPrice.toLocaleString('vi-VN')}đ</strong></p>

          <div className="payment-options-grid">
            <div 
              className={`payment-card ${selectedPayment === 'momo' ? 'selected' : ''}`}
              onClick={() => setSelectedPayment('momo')}
            >
              <div className="payment-icon momo">
                <svg viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="#A50064"/>
                  <text x="24" y="30" fontSize="20" fill="white" textAnchor="middle" fontWeight="bold">M</text>
                </svg>
              </div>
              <h3>MoMo</h3>
              <p>Ví điện tử MoMo</p>
            </div>

            <div 
              className={`payment-card ${selectedPayment === 'vnpay' ? 'selected' : ''}`}
              onClick={() => setSelectedPayment('vnpay')}
            >
              <div className="payment-icon vnpay">
                <svg viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="#0066CC"/>
                  <text x="24" y="30" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">VNP</text>
                </svg>
              </div>
              <h3>VNPay</h3>
              <p>Cổng thanh toán VNPay</p>
            </div>

            <div 
              className={`payment-card ${selectedPayment === 'COD' ? 'selected' : ''}`}
              onClick={() => setSelectedPayment('COD')}
            >
              <div className="payment-icon cod">
                <svg viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="#4CAF50"/>
                  <text x="24" y="30" fontSize="20" fill="white" textAnchor="middle" fontWeight="bold">₫</text>
                </svg>
              </div>
              <h3>COD</h3>
              <p>Thanh toán khi nhận hàng</p>
            </div>

            <div 
              className={`payment-card ${selectedPayment === 'bank_transfer' ? 'selected' : ''}`}
              onClick={() => setSelectedPayment('bank_transfer')}
            >
              <div className="payment-icon bank">
                <svg viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="8" fill="#FF9800"/>
                  <text x="24" y="30" fontSize="20" fill="white" textAnchor="middle" fontWeight="bold">🏦</text>
                </svg>
              </div>
              <h3>Chuyển khoản</h3>
              <p>Chuyển khoản ngân hàng</p>
            </div>
          </div>

          <button 
            className="btn-payment-submit"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Thanh toán ngay'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
