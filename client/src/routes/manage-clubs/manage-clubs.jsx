import { Box, Grid, Paper, Typography } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { Page } from '../../components/page/page';
import { CreateClubForm } from './create-club-form';
import { Flex } from '../../components/flex';
import { MyClubs } from './my-clubs/my-clubs';

export const ManageClubs = () => {
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
            Manage tennis clubs
          </Typography>
        </Box>
      </Grid>
      <Flex flexDirection='column' gap='20px' sx={{padding: '20px', width:"100%"}}>
        <CreateClubForm />
        <MyClubs />
      </Flex>
    </Page>
  );
};
