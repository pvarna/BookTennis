import { ErrorPage } from "../../components/error-page/error-page";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Navbar } from "../../components/navbar/navbar";
import {
    Box,
    CssBaseline,
    Grid,
    Paper,
    ThemeProvider,
    Typography,
    createTheme,
  } from "@mui/material";
  import "react-toastify/dist/ReactToastify.css";
  import { ErrorType } from "../../components/error-page/constants";
  
  const theme = createTheme();


export const CreateClub = () => {
  const user = useCurrentUser();

  if (!user) {
    return <ErrorPage type={ErrorType.NoSession} />;
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "10vh" }}>
        <CssBaseline />
        <Navbar/>
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
              Create a tennis club
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  );
};
