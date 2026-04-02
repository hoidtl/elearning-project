import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const VNPayReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    handlePaymentReturn();
  }, []);

  useEffect(() => {
    if (status !== 'processing' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      navigate('/orders');
    }
  }, [countdown, status, navigate]);

  const handlePaymentReturn = async () => {
    try {
      const params = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });

      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`http://localhost:5000/api/payment/vnpay/return?${queryString}`);
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        toast.success('Thanh toán thành công!');
      } else {
        setStatus('failed');
        toast.error(data.message || 'Thanh toán thất bại');
      }
    } catch (error) {
      console.error('Payment return error:', error);
      setStatus('failed');
      toast.error('Có lỗi xảy ra khi xử lý thanh toán');
    }
  };

  const responseCode = searchParams.get('vnp_ResponseCode');
  const amount = searchParams.get('vnp_Amount') ? parseInt(searchParams.get('vnp_Amount')) / 100 : 0;
  const orderId = searchParams.get('vnp_TxnRef');
  const transactionNo = searchParams.get('vnp_TransactionNo');
  const bankCode = searchParams.get('vnp_BankCode');

  return (
    <div className="vnpay-return-page">
      <div className="container">
        <div className="result-container">
          {status === 'processing' && (
            <>
              <div className="result-icon processing">
                <div className="spinner"></div>
              </div>
              <h2>Đang xử lý thanh toán...</h2>
              <p className="result-message">Vui lòng đợi trong giây lát</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="result-icon success">✓</div>
              <h2 className="success">Thanh toán thành công!</h2>
              <p className="result-message">Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đã được xác nhận.</p>
              
              <div className="order-details">
                <div className="detail-row">
                  <span>Mã đơn hàng:</span>
                  <strong>{orderId}</strong>
                </div>
                <div className="detail-row">
                  <span>Số tiền đã thanh toán:</span>
                  <strong>₫{amount.toLocaleString('vi-VN')}</strong>
                </div>
                <div className="detail-row">
                  <span>Mã giao dịch VNPAY:</span>
                  <strong>{transactionNo}</strong>
                </div>
                <div className="detail-row">
                  <span>Ngân hàng:</span>
                  <strong>{bankCode}</strong>
                </div>
              </div>

              <div className="btn-group">
                <button onClick={() => navigate('/')} className="btn btn-secondary">
                  Về trang chủ
                </button>
                <button onClick={() => navigate('/orders')} className="btn btn-primary">
                  Xem đơn hàng
                </button>
              </div>
            </>
          )}

          {status === 'failed' && (
            <>
              <div className="result-icon error">✗</div>
              <h2 className="error">Thanh toán thất bại</h2>
              <p className="result-message">
                {responseCode === '24' ? 'Giao dịch bị hủy' : 'Có lỗi xảy ra trong quá trình thanh toán'}
              </p>
              
              <div className="btn-group">
                <button onClick={() => navigate('/cart')} className="btn btn-secondary">
                  Quay lại giỏ hàng
                </button>
                <button onClick={() => navigate('/')} className="btn btn-primary">
                  Về trang chủ
                </button>
              </div>
            </>
          )}

          {status !== 'processing' && (
            <p className="countdown">
              Tự động chuyển về đơn hàng sau <span>{countdown}</span> giây...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VNPayReturn;
