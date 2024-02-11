import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { useAsync } from '../../../hooks/use-async';
import { clubService } from '../../../services/club-service';
import { ErrorContainer } from '../../../components/error-container';
import { ClubDetailsRow } from './club-row/club-details-row';

export const MyClubs = () => {
  const { id } = useCurrentUser();
  const { data, loading, error, reload } = useAsync(
    async () => await clubService.loadClubsForUser(id),
    [id]
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (!loading && !data?.clubs) {
    return null;
  }

  return (
    <Box>
      <Typography variant='h4'>My Clubs</Typography>
      {data.clubs.length === 0 && (
        <Typography>You don't have any clubs yet</Typography>
      )}
      <TableContainer sx={{ th: { width: '200px' } }} component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>City</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.clubs.map((club) => (
              <ClubDetailsRow key={club.id} club={club} onAction={reload} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!!error?.message && <ErrorContainer error={'Error loading club'} />}
    </Box>
  );
};
