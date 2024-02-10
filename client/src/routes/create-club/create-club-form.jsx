import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useAsyncAction } from '../../hooks/use-async-action';
import { ErrorContainer } from '../../components/error-container';
import { clubService } from '../../services/club-service';
import { useNavigate } from 'react-router-dom';
import { Flex } from '../../components/flex';
import { Cities } from '../../constants';

export const CreateClubForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: null,
    city: null,
  });

  const {
    error,
    loading,
    trigger: handleSubmit,
  } = useAsyncAction(async (event) => {
    event.preventDefault();

    await clubService.createClub(formData);
    navigate('/profile');
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        paddingTop: '20px',
        display: 'flex',
        margin: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <TextField
        margin='normal'
        required
        fullWidth
        label='Club Name'
        autoFocus
        value={formData.name}
        onChange={(event) =>
          setFormData({ ...formData, name: event.target.value })
        }
      />
      <Flex flexDirection='column' sx={{ alignItems: 'center' }}>
        <InputLabel id='city-select-label' sx={{ alignSelf: 'flex-start' }}>
          City
        </InputLabel>
        <Select
          required
          labelId='city-select-label'
          id='city-select'
          value={formData.city}
          label='City'
          onChange={(event) =>
            setFormData({ ...formData, city: event.target.value })
          }
          sx={{ width: '200px' }}
        >
          {Cities.map((city) => (
            <MenuItem key={city.value} value={city.value}>
              {city.label}
            </MenuItem>
          ))}
        </Select>
      </Flex>
      <Button
        variant='contained'
        type='submit'
        sx={{ backgroundColor: '#EE7214', width: '200px' }}
      >
        Create Club
      </Button>
      {!!error?.message && <ErrorContainer error={'Error creating club'} />}
    </Box>
  );
};
