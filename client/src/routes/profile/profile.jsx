import { Button, CircularProgress, TablePagination } from '@mui/material';
import { Page } from '../../components/page/page';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { reservationService } from '../../services/reservation-service';
import { ErrorContainer } from '../../components/error-container';
import { Flex } from '../../components/flex';
import { Reservation } from './reservation';
import { useAsync } from '../../hooks/use-async';
import { useState } from 'react';
import { UserDetails } from './user-details';

export const Profile = () => {
  const { id } = useCurrentUser();
  const [showReservations, setShowReservations] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
  });
  const { data, loading, error, reload } = useAsync(
    async () => reservationService.loadReservationsForUser(id, pagination),
    [id, pagination]
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (!loading && !data?.reservations) {
    return null;
  }
  console.log(pagination);
  return (
    <Page>
      <Flex flexDirection='column' sx={{ margin: '16px' }}>
        <UserDetails userId={id} />
        <Button
          variant='contained'
          sx={{ backgroundColor: '#EE7214', width: '200px' }}
          onClick={() => setShowReservations(!showReservations)}
        >
          {showReservations ? 'Hide reservations' : 'Show reservations'}
        </Button>
        {!!error?.message && (
          <ErrorContainer error={'Error loading reservations'} />
        )}
        {showReservations && (
          <>
            <Flex flexDirection='column' sx={{ padding: '16px' }}>
              {data.reservations.map((res) => (
                <Reservation key={res.id} reservation={res} onDelete={reload} />
              ))}
            </Flex>
            <TablePagination
              count={data.total}
              page={pagination.page}
              onPageChange={(_, page) => setPagination({ ...pagination, page })}
              rowsPerPage={pagination.pageSize}
              onRowsPerPageChange={(e) =>
                setPagination({ page: 0, pageSize: parseInt(e.target.value) })
              }
            />
          </>
        )}
      </Flex>
    </Page>
  );
};
