import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dropTextIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Đã kết nối MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('products');

    // Lấy danh sách indexes
    const indexes = await collection.indexes();
    console.log('\n📋 Danh sách indexes hiện tại:');
    indexes.forEach(index => {
      console.log(`   - ${index.name}`);
    });

    // Xóa text index
    try {
      await collection.dropIndex('name_text_description_text');
      console.log('\n✅ Đã xóa text index cũ');
    } catch (error) {
      if (error.code === 27) {
        console.log('\n⚠️  Text index không tồn tại (đã xóa rồi)');
      } else {
        throw error;
      }
    }

    console.log('\n🎉 HOÀN THÀNH! Giờ có thể thêm khóa học.');
    console.log('\n💡 Khởi động lại backend server:');
    console.log('   cd backend');
    console.log('   npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

dropTextIndex();
