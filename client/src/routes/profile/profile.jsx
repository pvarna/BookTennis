import { Button, CircularProgress } from '@mui/material';
import { Page } from '../../components/page/page';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { reservationService } from '../../services/reservation-service';
import { ErrorContainer } from '../../components/error-container';
import { Flex } from '../../components/flex';
import { Reservation } from './reservation';
import { useAsync } from '../../hooks/use-async';
import { useState } from 'react';

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
      <Flex flexDirection='column' sx={{ margin: '16px' }}>
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
        {data && showReservations && (
          <Flex flexDirection='column' sx={{ padding: '16px' }}>
            {data.map((res) => (
              <Reservation key={res.id} reservation={res} onDelete={reload}/>
            ))}
          </Flex>
        )}
      </Flex>
    </Page>
  );
};
