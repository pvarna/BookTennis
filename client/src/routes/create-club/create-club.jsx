import { Box, Grid, Paper, Typography } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { Page } from '../../components/page/page';

export const CreateClub = () => {
  return (
    <Page>
      <Grid item xs={12} component={Paper} elevation={3} square>
        <Box
          sx={{
            my: 6,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h3' color='#EE7214'>
            Create a tennis club
          </Typography>
        </Box>
      </Grid>
    </Page>
  );
};
