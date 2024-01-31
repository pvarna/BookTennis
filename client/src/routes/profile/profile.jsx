import { CircularProgress } from '@mui/material';
import { Page } from '../../components/page/page';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useAsync } from '../../hooks/use-async';
import { reservationService } from '../../services/reservation-service';
import { ErrorContainer } from '../../components/error-container';
import { Flex } from '../../components/flex';
import { Reservation } from './reservation';

export const Profile = () => {
  const { id } = useCurrentUser();
  const { data, loading, error } = useAsync(
    async () => reservationService.loadReservationsForUser(id),
    [id]
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Page>
      {data && (
        <Flex flexDirection='column' sx={{ padding: '16px' }}>
          {data.map((res) => (
            <Reservation key={res.id} reservation={res} />
          ))}
        </Flex>
      )}
      {!!error?.message && (
        <ErrorContainer error={'Error loading reservations'} />
      )}
    </Page>
  );
};
