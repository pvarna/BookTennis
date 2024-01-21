import { Box, Grid, Paper, Typography } from '@mui/material';
import { Page } from '../../components/page/page';

export const Profile = () => {
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
            Your profile
          </Typography>
        </Box>
      </Grid>
    </Page>
  );
};
