import {
  chatPath,
  manageClubsPath,
  profilePath,
  adminPath,
} from '../../routes/constants';
import { ErrorPage } from '../error-page/error-page';
import { useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ErrorType } from '../../components/error-page/constants';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const { pathname } = useLocation();
  const user = useCurrentUser();

  if (
    !user &&
    (pathname.includes(chatPath) ||
      pathname.includes(manageClubsPath) ||
      pathname.includes(profilePath) ||
      pathname.includes(adminPath))
  ) {
    return <ErrorPage type={ErrorType.NoSession} />;
  }

  // Add check is user is admin
  // if they are not - they cannot see the clubs approval page

  return <Outlet />;
};
