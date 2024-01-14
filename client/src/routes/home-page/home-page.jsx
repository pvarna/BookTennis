import { userService } from "../../services/user-service";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
  Button
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { loginPath } from "../constants";

const theme = createTheme();

export const HomePage = () => {
  const navigate = useNavigate();
  // TODO: visualise courts

  const handleLogout = () => {
    userService.logout();
    navigate(loginPath);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "10vh" }}>
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={3} square>
          <Box
            sx={{
              my: 6,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h3" color="#EE7214">
              Tennis clubs
            </Typography>
          </Box>
          <Button onClick = {handleLogout}>
            Log out
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
