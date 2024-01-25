import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';

export function PrivateRoute() {
  const user = useCurrentUser();
  // const location = useLocation();

  return user ? (
    // <PageWrapper>
      <Outlet />
    // </PageWrapper>
  ) : (
    <Navigate to="/login"  />
  );
}