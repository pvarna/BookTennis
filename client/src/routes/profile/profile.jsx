import { Button, CircularProgress, Box, Typography } from '@mui/material';
import { Page } from '../../components/page/page';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { reservationService } from '../../services/reservation-service';
import { ErrorContainer } from '../../components/error-container';
import { Flex } from '../../components/flex';
import { Reservation } from './reservation';
import { useAsync } from '../../hooks/use-async';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from "@mui/icons-material/Search";


export const Profile = () => {
  const { id } = useCurrentUser();
  const [showReservations, setShowReservations] = useState(false);
  const { data, loading, error, reload } = useAsync(
    async () => reservationService.loadReservationsForUser(id),
    [id]
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Page>
      <Flex flexDirection='column' sx={{ margin: '16px', width:'100%', alignItems:'center' }}>
        <Button
          variant='containerd'
          sx={{ backgroundColor: '#EE7214', width: '200px' }}
          onClick={() => setShowReservations(!showReservations)}
        >
          {showReservations ? 'Hide reservations' : 'Show reservations'}
        </Button>
        {!!error?.message && (
          <ErrorContainer error={'Error loading reservations'} />
        )}
        {data && data.length > 0 && showReservations &&
         (
          <TableContainer component={Paper} sx={{paddingLeft:'auto'}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Reservation ID</TableCell>
                <TableCell align="center">Court ID</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Start time</TableCell>
                <TableCell align="center">Duration in minutes</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((reservation) => (
                <Reservation key={reservation.id} reservation={reservation} onDelete={reload}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
        {(!data || data.length === 0) && showReservations && (
           <Box
           sx={{
             display: "flex",
             flexDirection: "column",
             alignItems: "center",
           }}
         >
           <SearchIcon sx={{ fontSize: "80px", color: "#EE7214" }} />
           <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
             No reservations yet
           </Typography>
           <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Try reserving a court to see it here
           </Typography>
         </Box>
        )}
      </Flex>
    </Page>
  );
};
