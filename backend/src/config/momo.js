export const momoConfig = {
  partnerCode: process.env.MOMO_PARTNER_CODE || 'MOMO',
  accessKey: process.env.MOMO_ACCESS_KEY || 'F8BBA842ECF85',
  secretKey: process.env.MOMO_SECRET_KEY || 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
  endpoint: 'https://test-payment.momo.vn/v2/gateway/api/create',
  redirectUrl: process.env.FRONTEND_URL + '/payment/momo-return',
  ipnUrl: process.env.FRONTEND_URL + '/api/payment/momo/ipn',
  requestType: 'captureWallet',
};
