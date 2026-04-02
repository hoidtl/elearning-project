import crypto from 'crypto';
import axios from 'axios';
import { momoConfig } from '../config/momo.js';
import Order from '../models/Order.js';

// Tạo thanh toán MoMo
export const createMoMoPayment = async (req, res) => {
  try {
    const { orderId, amount, orderInfo } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu thông tin đơn hàng',
      });
    }

    const requestId = `${orderId}_${Date.now()}`;
    const orderIdStr = String(orderId);
    const amountStr = String(amount);
    const orderInfoStr = orderInfo || `Thanh toan khoa hoc ${orderIdStr}`;

    // Tạo chữ ký
    const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${amountStr}&extraData=&ipnUrl=${momoConfig.ipnUrl}&orderId=${orderIdStr}&orderInfo=${orderInfoStr}&partnerCode=${momoConfig.partnerCode}&redirectUrl=${momoConfig.redirectUrl}&requestId=${requestId}&requestType=${momoConfig.requestType}`;
    
    const signature = crypto
      .createHmac('sha256', momoConfig.secretKey)
      .update(rawSignature)
      .digest('hex');

    // Request body
    const requestBody = {
      partnerCode: momoConfig.partnerCode,
      accessKey: momoConfig.accessKey,
      requestId: requestId,
      amount: amountStr,
      orderId: orderIdStr,
      orderInfo: orderInfoStr,
      redirectUrl: momoConfig.redirectUrl,
      ipnUrl: momoConfig.ipnUrl,
      extraData: '',
      requestType: momoConfig.requestType,
      signature: signature,
      lang: 'vi',
    };

    console.log('MoMo Payment Request:', { orderId, amount, requestId });

    // Gọi API MoMo
    const response = await axios.post(momoConfig.endpoint, requestBody);

    if (response.data.resultCode === 0) {
      return res.json({
        success: true,
        data: {
          paymentUrl: response.data.payUrl,
          deeplink: response.data.deeplink,
          qrCodeUrl: response.data.qrCodeUrl,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: response.data.message || 'Lỗi tạo thanh toán MoMo',
      });
    }
  } catch (error) {
    console.error('MoMo payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo thanh toán MoMo',
      error: error.message,
    });
  }
};

// Xử lý callback từ MoMo
export const momoReturn = async (req, res) => {
  try {
    const {
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = req.query;

    // Verify signature
    const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${momoConfig.partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
    
    const expectedSignature = crypto
      .createHmac('sha256', momoConfig.secretKey)
      .update(rawSignature)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({
        success: false,
        message: 'Chữ ký không hợp lệ',
      });
    }

    if (resultCode === '0') {
      // Thanh toán thành công
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = 'paid';
        order.status = 'confirmed';
        order.momoTransactionId = transId;
        await order.save();

        return res.json({
          success: true,
          message: 'Thanh toán thành công',
          data: {
            orderId,
            amount,
            transId,
          },
        });
      }
    }

    return res.json({
      success: false,
      message: message || 'Thanh toán thất bại',
      code: resultCode,
    });
  } catch (error) {
    console.error('MoMo return error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi xử lý kết quả thanh toán',
      error: error.message,
    });
  }
};

// IPN từ MoMo
export const momoIPN = async (req, res) => {
  try {
    const {
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = req.body;

    // Verify signature
    const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${momoConfig.partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
    
    const expectedSignature = crypto
      .createHmac('sha256', momoConfig.secretKey)
      .update(rawSignature)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(204).json({});
    }

    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(204).json({});
    }

    if (order.paymentStatus === 'paid') {
      return res.status(204).json({});
    }

    if (resultCode === '0') {
      order.paymentStatus = 'paid';
      order.status = 'confirmed';
      order.momoTransactionId = transId;
      await order.save();
    }

    return res.status(204).json({});
  } catch (error) {
    console.error('MoMo IPN error:', error);
    return res.status(204).json({});
  }
};
