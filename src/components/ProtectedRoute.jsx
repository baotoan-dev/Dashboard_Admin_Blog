import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // hoặc kiểm tra Redux

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
