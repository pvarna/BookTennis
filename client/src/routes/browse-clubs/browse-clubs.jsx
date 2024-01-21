import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { COURT_SURFACES, Cities } from '../../constants';
import { useRef, useState } from 'react';
import { useAsyncAction } from '../../hooks/use-async-action';
import { ErrorContainer } from '../../components/error-container';
import { clubService } from '../../services/club-service';
import { ClubList } from './club-list/club-list';
import { Flex } from '../../components/flex';
import { Page } from '../../components/page/page';

export const BrowseClubs = () => {
  const initialRenderRef = useRef(true);
  const [filters, setFilters] = useState({
    city: '',
    surfaces: [],
  });
  const [clubs, setClubs] = useState([]);

  const {
    error,
    loading,
    trigger: handleSubmit,
  } = useAsyncAction(async (event) => {
    event.preventDefault();

    const clubs = await clubService.loadClubs(filters.city, filters.surfaces);
    setClubs(clubs);
    initialRenderRef.current = false;
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Page>
      <Box component='form' onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Flex flexDirection='column' gap='2px'>
            <InputLabel id='city-select-label'>City</InputLabel>
            <Select
              labelId='city-select-label'
              id='city-select'
              value={filters.city}
              label='City'
              onChange={(event) =>
                setFilters({ ...filters, city: event.target.value })
              }
            >
              {Cities.map((city) => (
                <MenuItem key={city.value} value={city.value.toLowerCase()}>
                  {city.label}
                </MenuItem>
              ))}
            </Select>
          </Flex>
          <Flex flexDirection='column' gap='2px'>
            <InputLabel id='surface-select-label'>Surface</InputLabel>
            <Select
              labelId='surface-select-label'
              id='surface-select'
              value={filters.surfaces}
              label='Surface'
              multiple
              onChange={(event) =>
                setFilters({ ...filters, surfaces: event.target.value })
              }
            >
              {COURT_SURFACES.map((surface) => (
                <MenuItem key={surface} value={surface}>
                  {surface}
                </MenuItem>
              ))}
            </Select>
          </Flex>
          <Button
            variant='contained'
            type='submit'
            sx={{ mt: 3, mb: 2, backgroundColor: '#EE7214' }}
          >
            Search
          </Button>
        </Box>
        {!!error?.message && <ErrorContainer error={error.message} />}
        <ClubList clubs={clubs} isInitial={initialRenderRef.current} />
      </Box>
    </Page>
  );
};
