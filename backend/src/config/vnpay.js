export const vnpayConfig = {
  vnp_TmnCode: 'M90OKV4M',
  vnp_HashSecret: 'F4JGS5FSXYC8ZN2Y85U1HIADBHDH22BR',
  vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  vnp_ReturnUrl: process.env.FRONTEND_URL + '/payment/vnpay-return',
  vnp_ApiUrl: 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction',
};
