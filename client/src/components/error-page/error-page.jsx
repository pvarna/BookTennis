import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { root } from "../../routes/constants";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "./constants";

export const ErrorPage = ({ type }) => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#EE7214", fontFamily: "Roboto" }}
      >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Book Tennis
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {type === ErrorType.AccessDenied && (
            <>
              <LockIcon sx={{ fontSize: "80px", color: "#EE7214" }} />
              <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                Access Denied
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                You do not have permission to access this page.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#EE7214" }}
                type="button"
                onClick={() => navigate(root)}
              >
                Back to home
              </Button>
            </>
          )}
          {type === ErrorType.NoSession && (
            <>
              <ErrorOutlineIcon sx={{ fontSize: "80px", color: "#EE7214" }} />
              <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                No active sesssion
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                You need to login or register to access this page
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#EE7214" }}
                type="button"
                onClick={() => navigate(root)}
              >
                Back to home
              </Button>
            </>
          )}
          {type === ErrorType.PageNotFound && (
            <>
              <SentimentVeryDissatisfiedIcon
                sx={{ fontSize: "80px", color: "#EE7214" }}
              />
              <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                Page not found
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                The page you are looking for does not exist.{" "}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#EE7214" }}
                type="button"
                onClick={() => navigate(root)}
              >
                Back to home
              </Button>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};
