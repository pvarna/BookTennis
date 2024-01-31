import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { loginPath } from '../../routes/constants';

export function PrivateRoute() {
  const user = useCurrentUser();

  return user ? <Outlet /> : <Navigate to={loginPath} />;
}
