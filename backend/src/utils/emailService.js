import nodemailer from 'nodemailer';

// Tạo transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Gửi OTP email
export const sendOTPEmail = async (email, otp, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"E-Learning Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Xác thực tài khoản - Mã OTP',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1c1d1f; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #a435f0; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f7f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .otp-box { background: white; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; border: 2px solid #a435f0; }
            .otp-code { font-size: 32px; font-weight: bold; color: #a435f0; letter-spacing: 8px; }
            .footer { text-align: center; margin-top: 20px; color: #6a6f73; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>E-Learning Platform</h1>
            </div>
            <div class="content">
              <h2>Xin chào ${name}!</h2>
              <p>Cảm ơn bạn đã đăng ký tài khoản tại E-Learning Platform.</p>
              <p>Để hoàn tất đăng ký, vui lòng nhập mã OTP bên dưới:</p>
              
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
              </div>
              
              <p><strong>Lưu ý:</strong> Mã OTP này có hiệu lực trong 10 phút.</p>
              <p>Nếu bạn không thực hiện đăng ký này, vui lòng bỏ qua email này.</p>
            </div>
            <div class="footer">
              <p>© 2026 E-Learning Platform. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};

// Gửi email chào mừng sau khi verify
export const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"E-Learning Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Chào mừng đến với E-Learning Platform!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1c1d1f; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #a435f0; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f7f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #a435f0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #6a6f73; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Chào mừng đến với E-Learning!</h1>
            </div>
            <div class="content">
              <h2>Xin chào ${name}!</h2>
              <p>Tài khoản của bạn đã được xác thực thành công.</p>
              <p>Bạn có thể bắt đầu khám phá hàng nghìn khóa học chất lượng cao từ các chuyên gia hàng đầu.</p>
              <a href="${process.env.FRONTEND_URL}/products" class="button">Khám phá khóa học</a>
            </div>
            <div class="footer">
              <p>© 2026 E-Learning Platform. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};
