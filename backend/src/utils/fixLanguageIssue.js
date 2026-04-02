import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixLanguageIssue = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Đã kết nối MongoDB');

    const db = mongoose.connection.db;
    
    // Xóa toàn bộ collection products
    console.log('\n🗑️  Đang xóa collection products...');
    await db.collection('products').drop().catch(() => {
      console.log('   Collection products không tồn tại hoặc đã xóa');
    });
    
    console.log('✅ Đã xóa collection products');
    
    console.log('\n🎉 HOÀN THÀNH!');
    console.log('\n📝 Bước tiếp theo:');
    console.log('   1. Khởi động lại backend server (Ctrl+C rồi npm run dev)');
    console.log('   2. Chạy seed data: node src/utils/seedData.js');
    console.log('   3. Hoặc thêm khóa học mới từ admin panel');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

fixLanguageIssue();
