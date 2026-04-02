import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const MoMoReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const resultCode = searchParams.get('resultCode');
    const message = searchParams.get('message');

    if (resultCode === '0') {
      setStatus('success');
      toast.success('Thanh toán MoMo thành công!');
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } else {
      setStatus('failed');
      toast.error(message || 'Thanh toán MoMo thất bại');
      setTimeout(() => {
        navigate('/cart');
      }, 3000);
    }
  }, [searchParams, navigate]);

  return (
    <div className="payment-return">
      <div className="container">
        {status === 'processing' && (
          <div className="payment-status">
            <h2>Đang xử lý thanh toán...</h2>
            <p>Vui lòng đợi trong giây lát</p>
          </div>
        )}

        {status === 'success' && (
          <div className="payment-status success">
            <div className="icon">✓</div>
            <h2>Thanh toán thành công!</h2>
            <p>Cảm ơn bạn đã thanh toán qua MoMo</p>
            <p>Đang chuyển đến trang đơn hàng...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="payment-status failed">
            <div className="icon">✗</div>
            <h2>Thanh toán thất bại</h2>
            <p>{searchParams.get('message') || 'Đã có lỗi xảy ra'}</p>
            <p>Đang chuyển về giỏ hàng...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoMoReturn;
