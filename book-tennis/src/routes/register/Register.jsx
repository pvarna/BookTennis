import {
    Box,
    Button,
    CssBaseline,
    Grid,
    MenuItem,
    Paper,
    TextField,
    ThemeProvider,
    Typography,
    createTheme,
  } from "@mui/material";
import { Cities } from "../../constants";
import { tennisHomeImageUrl } from "../../constants";
import { errorToast } from "../../utils/customToast";
  
  const theme = createTheme();
  
  export const Register = () => {
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const {email, password, names, phone, city} = data
      console.log({
        email: data.get("email"),
        password: data.get("password"),
        name: data.get("names"),
        phone: data.get("phone"),
        city: data.get("city"),
      });

      if(!email || !password || !names || !phone || !city){
        errorToast("Please provide all required data to proceed.")
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
              <Typography component="h1" variant="h5">
              Register to BookTennis
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
                  id="names"
                  label="Full name"
                  name="names"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phone"
                  label="Phone number"
                  type="phone"
                  id="phone"
                />
                <TextField
                  id="city"
                  name="city"
                  select
                  required
                  fullWidth
                  defaultValue={""}
                  label="City"
                  helperText="Please choose the city you live in."
                >
                  {Cities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
     
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#EE7214" }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  };