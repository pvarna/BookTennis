import {
  Box,
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
import SearchIcon from '@mui/icons-material/Search';

const ReservationsTable = ({
  data,
  loading,
  reload,
  pagination,
  setPagination,
}) => {
  if (!loading && !data?.reservations) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SearchIcon sx={{ fontSize: '80px', color: '#EE7214' }} />
        <Typography component='h1' variant='h5' sx={{ mt: 2 }}>
          No reservations yet
        </Typography>
        <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
          Try reserving a court to see the reservation here
        </Typography>
      </Box>
    );
  }

  return (
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
  );
};

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
          <Typography variant='h4'>My reservations</Typography>
          <ReservationsTable
            data={data}
            loading={loading}
            reload={reload}
            pagination={pagination}
            setPagination={setPagination}
          />
        </Flex>
      </Flex>
    </Page>
  );
};
