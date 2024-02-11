import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Page } from '../../components/page/page';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { reservationService } from '../../services/reservation-service';
import { ErrorContainer } from '../../components/error-container';
import { Flex } from '../../components/flex';
import { ReservationRow } from './reservation-row';
import { useAsync } from '../../hooks/use-async';
import { useState } from 'react';
import { UserDetails } from './user-details';

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

  if (!loading && !data?.reservations) {
    return null;
  }

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
          <Paper>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Date</TableCell>
                    <TableCell align='center'>Hour</TableCell>
                    <TableCell align='center'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
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
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={data.total}
                      page={pagination.page}
                      onPageChange={(_, page) =>
                        setPagination({ ...pagination, page })
                      }
                      rowsPerPage={pagination.pageSize}
                      onRowsPerPageChange={(e) =>
                        setPagination({
                          page: 0,
                          pageSize: parseInt(e.target.value),
                        })
                      }
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Flex>
      </Flex>
    </Page>
  );
};
