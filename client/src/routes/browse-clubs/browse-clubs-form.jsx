import { Box, Button, InputLabel, MenuItem, Select } from '@mui/material';
import { Flex } from '../../components/flex';
import { COURT_SURFACES, Cities } from '../../constants';

export const BrowseClubsForm = ({ handleSubmit, filters, setFilters }) => {
  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        paddingTop: '20px',
        display: 'flex',
        width: '100%',
        marginLeft: '30%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <InputLabel id='city-select-label'>City</InputLabel>
        <Select
          labelId='city-select-label'
          id='city-select'
          value={filters.city}
          label='City'
          onChange={(event) =>
            setFilters({ ...filters, city: event.target.value })
          }
          sx={{
            width: '150px',
          }}
        >
          {Cities.map((city) => (
            <MenuItem key={city.value} value={city.value}>
              {city.label}
            </MenuItem>
          ))}
        </Select>
      </Flex>
      <Flex
        flexDirection='row'
        gap='8px'
        sx={{
          alignItems: 'center',
        }}
      >
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
          sx={{
            width: '150px',
          }}
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
        sx={{ backgroundColor: '#EE7214', width: '200px' }}
      >
        Search
      </Button>
      <Button
        variant='contained'
        onClick={() =>
          setFilters({
            city: '',
            surfaces: [],
          })
        }
        sx={{ backgroundColor: '#EE7214', width: '200px' }}
      >
        Clear filters
      </Button>
    </Box>
  );
};
