import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  chatPath,
  chatSlug,
  createClubsPath,
  homePath,
  loginPath,
  profilePath,
  registerPath,
} from "../../routes/constants";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { userService } from "../../services/user-service";
import { successToast } from "../../utils/customToast";

export const Navbar = () => {
  const { pathname } = useLocation();
  const user = useCurrentUser();
  const navigate = useNavigate();

  // TODO: get user role and if user is admin, render the clubs approval link too

  const renderUserOptions = () => {
    if (user) {
      return (
        <>
          {!pathname.includes(homePath) && (
            <Button color="inherit" onClick={() => navigate(homePath)}>
              Browse clubs
            </Button>
          )}
          {!pathname.includes(profilePath) && (
            <Button color="inherit" onClick={() => navigate(profilePath)}>
              Profile
            </Button>
          )}

          {!pathname.includes(chatSlug) && (
            <Button onClick={() => navigate(chatPath)} color="inherit">
              Chat
            </Button>
          )}

          <Button
            color="inherit"
            onClick={() => {
              navigate(createClubsPath);
            }}
          >
            Create club
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              userService.logout(user);
              successToast("You have been logged out.")
              navigate(homePath)
            }}
          >
            Logout
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button onClick={() => navigate(loginPath)} color="inherit">
            Log in
          </Button>
          <Button onClick={() => navigate(registerPath)} color="inherit">
            Register
          </Button>
        </>
      );
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#EE7214", fontFamily: "Roboto" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0.5 }}>
          Book Tennis
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        {renderUserOptions()}
      </Toolbar>
    </AppBar>
  );
};
