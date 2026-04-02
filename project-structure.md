# E-COMMERCE LEARNING PLATFORM - CẤU TRÚC DỰ ÁN

```
elearning-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── jwt.js
│   │   │   └── socket.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Category.js
│   │   │   ├── Order.js
│   │   │   ├── Cart.js
│   │   │   ├── Review.js
│   │   │   ├── Promotion.js
│   │   │   ├── Supplier.js
│   │   │   ├── Message.js
│   │   │   ├── Wishlist.js
│   │   │   └── Blog.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── categoryController.js
│   │   │   ├── orderController.js
│   │   │   ├── cartController.js
│   │   │   ├── reviewController.js
│   │   │   ├── promotionController.js
│   │   │   ├── supplierController.js
│   │   │   ├── userController.js
│   │   │   ├── chatController.js
│   │   │   ├── wishlistController.js
│   │   │   ├── blogController.js
│   │   │   └── analyticsController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── categoryRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   ├── reviewRoutes.js
│   │   │   ├── promotionRoutes.js
│   │   │   ├── supplierRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── chatRoutes.js
│   │   │   ├── wishlistRoutes.js
│   │   │   ├── blogRoutes.js
│   │   │   └── analyticsRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── roleCheck.js
│   │   │   ├── validation.js
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   ├── services/
│   │   │   ├── emailService.js
│   │   │   ├── uploadService.js
│   │   │   ├── recommendationService.js
│   │   │   └── paymentService.js
│   │   ├── utils/
│   │   │   ├── helpers.js
│   │   │   └── constants.js
│   │   └── server.js
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   │   └── assets/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   └── ChatWidget.jsx
│   │   │   ├── product/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductList.jsx
│   │   │   │   ├── ProductDetail.jsx
│   │   │   │   ├── FilterSidebar.jsx
│   │   │   │   └── RatingStars.jsx
│   │   │   ├── cart/
│   │   │   │   ├── CartItem.jsx
│   │   │   │   └── CartSummary.jsx
│   │   │   ├── checkout/
│   │   │   │   ├── ShippingForm.jsx
│   │   │   │   └── PaymentMethod.jsx
│   │   │   ├── admin/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ProductManagement.jsx
│   │   │   │   ├── OrderManagement.jsx
│   │   │   │   ├── UserManagement.jsx
│   │   │   │   └── Analytics.jsx
│   │   │   └── review/
│   │   │       └── ReviewForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Blog.jsx
│   │   │   └── admin/
│   │   │       └── AdminDashboard.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   └── useSocket.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── utils/
│   │   │   ├── helpers.js
│   │   │   └── constants.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
└── README.md
```
