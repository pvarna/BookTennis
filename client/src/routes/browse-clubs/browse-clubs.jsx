import {
  CircularProgress,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useAsyncAction } from '../../hooks/use-async-action';
import { ErrorContainer } from '../../components/error-container';
import { clubService } from '../../services/club-service';
import { ClubList } from './club-list/club-list';
import { Flex } from '../../components/flex';
import { Page } from '../../components/page/page';
import { BrowseClubsForm } from './browse-clubs-form';

export const BrowseClubs = () => {
  const initialRenderRef = useRef(true);
  const [filters, setFilters] = useState({
    city: '',
    surfaces: [],
    page: 0,
    pageSize: 10,
  });

  const {
    data,
    error,
    loading,
    trigger: handleSubmit,
  } = useAsyncAction(async (event) => {
    event.preventDefault();

    initialRenderRef.current = false;
    return await clubService.loadClubs(filters);
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Page>
      <Grid item xs={12} component={Paper} elevation={3} square>
        <Flex
          flexDirection='column'
          sx={{ my: 6, mx: 4, alignItems: 'center' }}
        >
          <Typography component='h1' variant='h3' color='#EE7214'>
            Browse clubs and courts
          </Typography>
        </Flex>
      </Grid>
      <BrowseClubsForm
        handleSubmit={handleSubmit}
        filters={filters}
        setFilters={setFilters}
      />
      {!!error?.message && <ErrorContainer error={error.message} />}
      <ClubList
        clubs={data?.clubs ?? []}
        isInitial={initialRenderRef.current}
        total={data?.total ?? 0}
        page={filters.page}
        pageSize={filters.pageSize}
        onPageChange={(_, page) => setFilters({ ...filters, page })}
        onRowsPerPageChange={(e) =>
          setFilters({
            ...filters,
            page: 0,
            pageSize: parseInt(e.target.value),
          })
        }
      />
    </Page>
  );
};
