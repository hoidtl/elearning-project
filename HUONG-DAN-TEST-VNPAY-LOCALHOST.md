# Hướng dẫn Test VNPay trên Localhost

## Vấn đề
VNPay cần URL công khai để gọi callback, localhost không hoạt động.

## Giải pháp

### 1. Cloudflare Tunnel (Khuyên dùng - Miễn phí, ổn định)

1. Tải cloudflared: https://github.com/cloudflare/cloudflared/releases
2. Chạy:
```bash
cloudflared tunnel --url http://localhost:5000
```
3. Copy URL (dạng: `https://xxx.trycloudflare.com`)
4. Cập nhật `backend/.env`:
```
FRONTEND_URL=https://xxx.trycloudflare.com
```
5. Restart backend

### 2. LocalTunnel (Đơn giản)

```bash
npm install -g localtunnel
lt --port 5000
```

Copy URL và cập nhật config tương tự.

### 3. Deploy lên Hosting miễn phí

**Backend: Render.com**
- Tạo tài khoản tại render.com
- New → Web Service
- Connect GitHub repo
- Deploy

**Frontend: Vercel.com**
- Tạo tài khoản tại vercel.com
- Import GitHub repo
- Deploy

### 4. Mock Payment (Test UI only)

Nếu chỉ muốn test giao diện thanh toán mà không cần VNPay thật:

Sửa `backend/src/controllers/paymentController.js`:
```javascript
export const createVNPayPayment = async (req, res) => {
  // Mock payment URL cho localhost testing
  if (process.env.NODE_ENV === 'development') {
    const { orderId } = req.body;
    const mockUrl = `${process.env.FRONTEND_URL}/payment/vnpay-return?vnp_ResponseCode=00&vnp_TxnRef=${orderId}&vnp_TransactionNo=MOCK123`;
    
    return res.json({
      success: true,
      data: { paymentUrl: mockUrl }
    });
  }
  
  // Code VNPay thật...
};
```

## Khuyến nghị

Dùng **Cloudflare Tunnel** - miễn phí, ổn định, không bị antivirus chặn như ngrok.
