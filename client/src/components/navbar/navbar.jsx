import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  chatPath,
  chatSlug,
  manageClubsPath,
  homePath,
  landingPagePath,
  loginPath,
  profilePath,
  registerPath,
  adminPath,
} from '../../routes/constants';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { userService } from '../../services/user-service';
import { successToast } from '../../utils/customToast';

const AuthenticatedUser = () => {
  const { pathname } = useLocation();
  const user = useCurrentUser();
  const navigate = useNavigate();

  return (
    <Box>
      {!pathname.includes(homePath) && (
        <Button color='inherit' onClick={() => navigate(homePath)}>
          Browse clubs
        </Button>
      )}
      {!pathname.includes(profilePath) && (
        <Button color='inherit' onClick={() => navigate(profilePath)}>
          Profile
        </Button>
      )}

      {!pathname.includes(chatSlug) && (
        <Button onClick={() => navigate(chatPath)} color='inherit'>
          Chat
        </Button>
      )}

      <Button color='inherit' onClick={() => navigate(manageClubsPath)}>
        Manage clubs
      </Button>
      {user.isAdmin && (
        <Button color='inherit' onClick={() => navigate(adminPath)}>
          Admin
        </Button>
      )}
      <Button
        color='inherit'
        onClick={() => {
          userService.logout(user);
          successToast('You have been logged out.');
          navigate(homePath);
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

const UnauthenticatedUser = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Button onClick={() => navigate(loginPath)} color='inherit'>
        Log in
      </Button>
      <Button onClick={() => navigate(registerPath)} color='inherit'>
        Register
      </Button>
    </Box>
  );
};

// TODO: get user role and if user is admin, render the clubs approval link too
export const Navbar = () => {
  const user = useCurrentUser();

  return (
    <AppBar
      position='static'
      sx={{ backgroundColor: '#EE7214', fontFamily: 'Roboto' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to={landingPagePath}>
          <Typography variant='h6' component='div' sx={{ flexGrow: 0.5 }}>
            Book Tennis
          </Typography>
        </Link>
        {user ? <AuthenticatedUser /> : <UnauthenticatedUser />}
      </Toolbar>
    </AppBar>
  );
};
