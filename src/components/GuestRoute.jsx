import { Navigate, Outlet } from 'react-router-dom';

export default function GuestRoute() {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
