import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';

export function PublicRoute() {
  const user = useCurrentUser();

  return !user ? <Outlet /> : <Navigate to="/" />;
}
