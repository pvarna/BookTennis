import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { errorToast } from "../../utils/customToast";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Book Tennis {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export const Login = () => {
  // const validateUser = (email, pass) => {
  //   const filteredByEmail = allUsers.filter((user) => user.email === email);
  //   if (filteredByEmail.length === 0) {
  //     errorToast("Имейлът, който въведохте не е намерен. Моля опитайте отново.");
  //     return;
  //   }
  //   const filteredByPass = filteredByEmail.filter(
  //     (user) => user.password === pass
  //   );
  //   if (filteredByPass.length === 0) {
  //     errorToast("Паролата, която въведохте не е правилна. Моля опитайте отново.");
  //     return;
  //   }
  //   return filteredByPass.length > 0;
  // };

  //TODO:  If logged in, navigate to home page
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const pass = data.get("password");
    if (!email || !pass) {
      console.log("im if")
      // const valid = validateUser(email.toString(), pass.toString());
      // if(valid){
      //   dispatch(setEmail(email));
      //   dispatch(setPassword(pass));
      //   //TODO: navigate to next page -> home page (/home)
      // }
      errorToast("Please input your login data to proceed.");
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              `url(${tennisHomeImageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, backgroundColor: "#EE7214" }} />

            <Typography component="h1" variant="h5">
           Log in to Book Tennis
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 3, mb: 2, backgroundColor: "#EE7214" }}
              >
               Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Click here to register"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};