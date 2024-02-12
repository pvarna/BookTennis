import { CircularProgress, TableRow, Typography } from '@mui/material';
import { Page } from '../../components/page/page';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { reservationService } from '../../services/reservation-service';
import { ErrorContainer } from '../../components/error-container';
import { Flex } from '../../components/flex';
import { useAsync } from '../../hooks/use-async';
import { useState } from 'react';
import { UserDetails } from './user-details';
import { EmptyTable } from '../../components/empty-table/empty-table';
import { PaginatedTable } from '../../components/paginated-table/paginated-table';
import { ReservationRow } from './reservation-row';

export const Profile = () => {
  const { id } = useCurrentUser();
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

  const noReservations =
    (!loading && !data?.reservations) || data.reservations.length === 0;

  return (
    <Page>
      <Flex
        flexDirection='column'
        gap='50px'
        sx={{ padding: '16px', alignItems: 'flex-start' }}
      >
        <Flex flexDirection='column' sx={{ alignItems: 'flex-start' }}>
          <Typography variant='h4'>User Details</Typography>
          <UserDetails userId={id} />
          {!!error?.message && (
            <ErrorContainer error={'Error loading reservations'} />
          )}
        </Flex>
        <Flex flexDirection='column' sx={{ alignItems: 'flex-start' }}>
          <Typography variant='h4'>Reservations</Typography>
          {noReservations ? (
            <EmptyTable
              title='No reservations yet'
              content='Try reserving a court to see the reservation here'
            />
          ) : (
            <PaginatedTable
              headers={['Date', 'Hour', 'Actions']}
              total={data.total}
              pagination={pagination}
              setPagination={setPagination}
            >
              {data.reservations.map((res) => (
                <TableRow
                  key={res.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <ReservationRow
                    key={res.id}
                    reservation={res}
                    onDelete={reload}
                  />
                </TableRow>
              ))}
            </PaginatedTable>
          )}
        </Flex>
      </Flex>
    </Page>
  );
};
