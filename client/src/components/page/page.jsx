import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Grid, createTheme } from '@mui/material';
import { Navbar } from '../navbar/navbar';

const theme = createTheme();

export const Page = ({ children }) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component='main' sx={{ height: '10vh' }}>
          <CssBaseline />
          <Navbar />
          {children}
        </Grid>
      </ThemeProvider>
    </div>
  );
};
