import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Đã kết nối MongoDB');

    // Thông tin admin
    const adminData = {
      name: 'Admin',
      email: 'admin@elearning.com',
      password: 'admin123456', // Sẽ được hash tự động bởi User model
      role: 'admin',
      phone: '0123456789',
    };

    // Kiểm tra admin đã tồn tại chưa
    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('⚠️  Tài khoản admin đã tồn tại!');
      console.log('\n📧 Email:', adminData.email);
      console.log('🔑 Password: admin123456');
      console.log('\n💡 Nếu quên mật khẩu, xóa user này và chạy lại script.');
      process.exit(0);
    }

    // Tạo admin mới
    const admin = await User.create(adminData);
    
    console.log('\n🎉 TẠO TÀI KHOẢN ADMIN THÀNH CÔNG!');
    console.log('\n📋 Thông tin đăng nhập:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    admin@elearning.com');
    console.log('🔑 Password: admin123456');
    console.log('👤 Role:     admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🌐 Truy cập Admin Dashboard:');
    console.log('   http://localhost:5173/admin');
    console.log('\n⚠️  LƯU Ý: Đổi mật khẩu sau khi đăng nhập lần đầu!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

createAdmin();
