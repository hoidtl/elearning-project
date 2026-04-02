import crypto from 'crypto';
import querystring from 'querystring';
import { vnpayConfig } from '../config/vnpay.js';
import Order from '../models/Order.js';

// Tạo URL thanh toán VNPay
export const createVNPayPayment = async (req, res) => {
  try {
    const { orderId, amount, orderInfo, bankCode } = req.body;

    // Validate
    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu thông tin đơn hàng',
      });
    }

    const ipAddr = req.headers['x-forwarded-for'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   req.connection.socket.remoteAddress;

    const createDate = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const orderId_str = String(orderId);

    console.log('VNPay Payment Request:', { orderId, amount, createDate });

    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: vnpayConfig.vnp_TmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId_str,
      vnp_OrderInfo: orderInfo || `Thanh toan don hang ${orderId_str}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: vnpayConfig.vnp_ReturnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    if (bankCode) {
      vnp_Params.vnp_BankCode = bankCode;
    }

    // Sắp xếp params
    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params.vnp_SecureHash = signed;

    const paymentUrl = vnpayConfig.vnp_Url + '?' + querystring.stringify(vnp_Params, { encode: false });

    res.json({
      success: true,
      data: {
        paymentUrl,
      },
    });
  } catch (error) {
    console.error('VNPay payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo thanh toán',
      error: error.message,
    });
  }
};

// Xử lý callback từ VNPay
export const vnpayReturn = async (req, res) => {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      const orderId = vnp_Params.vnp_TxnRef;
      const responseCode = vnp_Params.vnp_ResponseCode;
      const amount = vnp_Params.vnp_Amount / 100;
      const transactionNo = vnp_Params.vnp_TransactionNo;

      if (responseCode === '00') {
        // Thanh toán thành công - cập nhật đơn hàng
        const order = await Order.findById(orderId);
        if (order) {
          order.paymentStatus = 'paid';
          order.status = 'confirmed';
          order.vnpayTransactionId = transactionNo;
          await order.save();

          return res.json({
            success: true,
            message: 'Thanh toán thành công',
            data: {
              orderId,
              amount,
              transactionNo,
            },
          });
        }
      } else {
        return res.json({
          success: false,
          message: 'Thanh toán thất bại',
          code: responseCode,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Chữ ký không hợp lệ',
      });
    }
  } catch (error) {
    console.error('VNPay return error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi xử lý kết quả thanh toán',
      error: error.message,
    });
  }
};

// IPN - Instant Payment Notification
export const vnpayIPN = async (req, res) => {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      const orderId = vnp_Params.vnp_TxnRef;
      const responseCode = vnp_Params.vnp_ResponseCode;

      const order = await Order.findById(orderId);
      
      if (!order) {
        return res.status(200).json({ RspCode: '01', Message: 'Order not found' });
      }

      if (order.paymentStatus === 'paid') {
        return res.status(200).json({ RspCode: '02', Message: 'Order already confirmed' });
      }

      if (responseCode === '00') {
        order.paymentStatus = 'paid';
        order.status = 'confirmed';
        order.vnpayTransactionId = vnp_Params.vnp_TransactionNo;
        await order.save();

        return res.status(200).json({ RspCode: '00', Message: 'Success' });
      } else {
        return res.status(200).json({ RspCode: '00', Message: 'Payment failed' });
      }
    } else {
      return res.status(200).json({ RspCode: '97', Message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('VNPay IPN error:', error);
    return res.status(200).json({ RspCode: '99', Message: 'Unknown error' });
  }
};

// Helper function
function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach(key => {
    sorted[key] = obj[key];
  });
  return sorted;
}
