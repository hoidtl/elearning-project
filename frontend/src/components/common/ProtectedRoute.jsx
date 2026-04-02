import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuthStore();
  const location = useLocation();

  // Nếu chưa đăng nhập, redirect về login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu route yêu cầu admin nhưng user không phải admin
  if (adminOnly && user.role !== 'admin' && user.role !== 'staff') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
