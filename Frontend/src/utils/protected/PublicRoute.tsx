import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { type RootState } from '@/store/store';

const PublicRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
