import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { tennisHomeImageUrl } from '../../constants';
import { errorToast, successToast } from '../../utils/customToast';
import { userService } from '../../services/user-service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.values(formData).filter((v) => v === '').length > 0) {
      errorToast('Please provide all required data to proceed.');
      return;
    }

    const user = await userService.register(formData);
    successToast(`Successfully registered ${user.fullName}`);
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${tennisHomeImageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h5'>
              Register to BookTennis
            </Typography>
            <Box
              id='id123'
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='names'
                label='Full name'
                name='names'
                autoFocus
                value={formData.fullName}
                onChange={(event) => {
                  setFormData({ ...formData, fullName: event.target.value });
                }}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={formData.password}
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='phone'
                label='Phone number'
                type='phone'
                id='phone'
                value={formData.phone}
                onChange={(event) =>
                  setFormData({ ...formData, phone: event.target.value })
                }
              />

              <Button
                fullWidth
                variant='contained'
                type='submit'
                sx={{ mt: 3, mb: 2, backgroundColor: '#EE7214' }}
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
