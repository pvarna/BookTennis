import { Box, CircularProgress, Typography } from '@mui/material';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { useAsync } from '../../../hooks/use-async';
import { clubService } from '../../../services/club-service';
import { ErrorContainer } from '../../../components/error-container';
import { ClubDetailsRow } from './club-row/club-details-row';
import { BasicTable } from '../../../components/basic-table/basic-table';
import { EmptyTable } from '../../../components/empty-table/empty-table';

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
    <Box sx={{alignItems:'center', width: '100%'}}>
      <Typography variant="h4" sx={{paddingBottom: '50px'}}>My Clubs</Typography>
      {data.clubs.length === 0 && (
        <EmptyTable
        title="You don't have any clubs yet"
        content='Try to create a request for a club'
      />
      )}
      {data.clubs.length > 0 && (
        <BasicTable headers={['', 'Name', 'City', 'Actions']}>
        {data.clubs.map((club) => (
          <ClubDetailsRow key={club.id} club={club} onAction={reload} />
        ))}
      </BasicTable>
      )}

      {!!error?.message && <ErrorContainer error={"Error loading club"} />}
    </Box>

  );
};
