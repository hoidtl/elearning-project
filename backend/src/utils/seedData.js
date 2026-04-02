import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

dotenv.config();

const categories = [
  {
    name: 'Lập trình Web',
    description: 'Các khóa học về phát triển web frontend và backend',
  },
  {
    name: 'Lập trình Mobile',
    description: 'Phát triển ứng dụng di động iOS và Android',
  },
  {
    name: 'Data Science',
    description: 'Khoa học dữ liệu và phân tích dữ liệu',
  },
  {
    name: 'AI & Machine Learning',
    description: 'Trí tuệ nhân tạo và học máy',
  },
  {
    name: 'Cloud Computing',
    description: 'Điện toán đám mây AWS, Azure, Google Cloud',
  },
];

const products = [
  {
    name: 'Lập trình Web từ cơ bản đến nâng cao',
    description: 'Khóa học đầy đủ về HTML, CSS, JavaScript, React và Node.js. Phù hợp cho người mới bắt đầu muốn trở thành Full Stack Developer.',
    price: 399000,
    originalPrice: 999000,
    images: ['/images/courses/web-dev.jpg'],
    instructor: 'Nguyễn Văn A',
    level: 'beginner',
    duration: '40 giờ',
    language: 'Tiếng Việt',
    stock: 100,
    rating: 4.8,
    numReviews: 245,
    features: [
      'Học HTML5, CSS3 từ cơ bản đến nâng cao',
      'JavaScript ES6+ và DOM manipulation',
      'React.js - Framework phổ biến nhất',
      'Node.js và Express.js backend',
      '5 dự án thực tế hoàn chỉnh',
      'Hỗ trợ 24/7 từ giảng viên',
    ],
    requirements: [
      'Máy tính có kết nối internet',
      'Không cần kiến thức lập trình trước',
      'Đam mê học hỏi và kiên trì',
    ],
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'React.js - Xây dựng ứng dụng web hiện đại',
    description: 'Khóa học chuyên sâu về React.js, Redux, React Router và các công nghệ liên quan. Xây dựng ứng dụng web Single Page Application chuyên nghiệp.',
    price: 499000,
    originalPrice: 1200000,
    images: ['/images/courses/react.jpg'],
    instructor: 'Trần Thị B',
    level: 'intermediate',
    duration: '35 giờ',
    language: 'Tiếng Việt',
    stock: 100,
    rating: 4.9,
    numReviews: 189,
    features: [
      'React Hooks và Functional Components',
      'State Management với Redux Toolkit',
      'React Router v6',
      'API Integration với Axios',
      'Testing với Jest và React Testing Library',
      'Deployment lên Vercel/Netlify',
    ],
    requirements: [
      'Có kiến thức cơ bản về HTML, CSS, JavaScript',
      'Hiểu về ES6+ syntax',
    ],
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Node.js & Express - Backend Development',
    description: 'Học cách xây dựng RESTful API với Node.js và Express. Kết nối database MongoDB, authentication, authorization và deploy lên production.',
    price: 599000,
    originalPrice: 1500000,
    images: ['/images/courses/nodejs.jpg'],
    instructor: 'Lê Văn C',
    level: 'intermediate',
    duration: '45 giờ',
    language: 'Tiếng Việt',
    stock: 100,
    rating: 4.7,
    numReviews: 156,
    features: [
      'Node.js fundamentals',
      'Express.js framework',
      'MongoDB và Mongoose ODM',
      'JWT Authentication',
      'RESTful API design',
      'Error handling và validation',
      'Deploy lên Heroku/Railway',
    ],
    requirements: [
      'Biết JavaScript cơ bản',
      'Hiểu về HTTP và REST API',
    ],
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Full Stack MERN - Dự án thực tế E-commerce',
    description: 'Xây dựng website thương mại điện tử hoàn chỉnh với MongoDB, Express, React và Node.js. Từ thiết kế đến deployment.',
    price: 799000,
    originalPrice: 2000000,
    images: ['/images/courses/mern.jpg'],
    instructor: 'Phạm Thị D',
    level: 'advanced',
    duration: '60 giờ',
    language: 'Tiếng Việt',
    stock: 100,
    rating: 4.9,
    numReviews: 312,
    features: [
      'Xây dựng E-commerce từ A-Z',
      'Payment integration (VNPay, Momo)',
      'Admin Dashboard',
      'Real-time chat với Socket.io',
      'Image upload với Cloudinary',
      'SEO optimization',
      'Production deployment',
    ],
    requirements: [
      'Có kiến thức về React và Node.js',
      'Hiểu về database và API',
    ],
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Python cho Data Science',
    description: 'Học Python từ cơ bản, pandas, numpy, matplotlib và machine learning cơ bản. Phân tích dữ liệu thực tế.',
    price: 699000,
    originalPrice: 1800000,
    images: ['/images/courses/python-ds.jpg'],
    instructor: 'Hoàng Văn E',
    level: 'beginner',
    duration: '50 giờ',
    language: 'Tiếng Việt',
    stock: 100,
    rating: 4.8,
    numReviews: 203,
    features: [
      'Python cơ bản đến nâng cao',
      'Pandas và NumPy',
      'Data visualization với Matplotlib, Seaborn',
      'Machine Learning cơ bản',
      'Scikit-learn',
      '10+ dự án phân tích dữ liệu thực tế',
    ],
    requirements: [
      'Không cần kiến thức lập trình',
      'Có kiến thức toán cơ bản',
    ],
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'React Native - Lập trình Mobile đa nền tảng',
    description: 'Xây dựng ứng dụng mobile cho iOS và Android với React Native. Một code base, hai nền tảng.',
    price: 899000,
    originalPrice: 2200000,
    images: ['/images/courses/react-native.jpg'],
    instructor: 'Vũ Thị F',
    level: 'intermediate',
    duration: '55 giờ',
    language: 'Tiếng Việt',
    stock: 100,
    rating: 4.6,
    numReviews: 134,
    features: [
      'React Native fundamentals',
      'Navigation với React Navigation',
      'State management',
      'Native modules',
      'Push notifications',
      'Publish lên App Store và Google Play',
    ],
    requirements: [
      'Có kiến thức về React.js',
      'Hiểu JavaScript ES6+',
    ],
    isFeatured: false,
    isActive: true,
  },
];

const seedData = async () => {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Đã kết nối MongoDB');

    // Xóa dữ liệu cũ
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Đã xóa dữ liệu cũ');

    // Tạo categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Đã tạo ${createdCategories.length} categories`);

    // Gán category cho products
    const productsWithCategory = products.map((product, index) => ({
      ...product,
      category: createdCategories[index % createdCategories.length]._id,
    }));

    // Tạo products
    const createdProducts = await Product.insertMany(productsWithCategory);
    console.log(`✅ Đã tạo ${createdProducts.length} products`);

    console.log('\n🎉 HOÀN THÀNH! Dữ liệu mẫu đã được thêm vào database.');
    console.log('\n📊 Thống kê:');
    console.log(`   - Categories: ${createdCategories.length}`);
    console.log(`   - Products: ${createdProducts.length}`);
    console.log('\n🌐 Mở trình duyệt: http://localhost:5173');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

seedData();
