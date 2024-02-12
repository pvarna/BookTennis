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
import { Flex } from '../../components/flex';
import { Cities } from '../../constants';
import { successToast } from '../../utils/customToast';
import { Popup } from '../../components/popup/popup';
import { clubCreationRequestService } from '../../services/club-creation-request-service';

const ClubForm = ({ formData, setFormData, onSubmit, error, onCancel }) => {
  return (
    <Box
      component='form'
      onSubmit={onSubmit}
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
      <Flex>
        <Button
          variant='contained'
          type='submit'
          sx={{ backgroundColor: '#EE7214', width: '200px' }}
        >
          Submit request
        </Button>
        <Button
          variant='contained'
          type='button'
          onClick={onCancel}
          sx={{ backgroundColor: '#EE7214', width: '200px' }}
        >
          Cancel
        </Button>
      </Flex>
      {!!error?.message && <ErrorContainer error={'Error creating club'} />}
    </Box>
  );
};

export const CreateClubForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    city: null,
  });

  const {
    error,
    loading,
    trigger: createClub,
  } = useAsyncAction(async (event) => {
    event.preventDefault();

    await clubCreationRequestService.createRequest(formData);
    setIsOpen(false);
    successToast('Request submitted successfully!');
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: '10px' }}>
      <Button
        variant='contained'
        sx={{ backgroundColor: '#EE7214', width: '200px' }}
        onClick={() => setIsOpen(true)}
      >
        Create Club
      </Button>
      <Popup
        open={isOpen}
        title={'Create a tennis club request'}
        content={
          <ClubForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={createClub}
            onCancel={() => setIsOpen(false)}
            error={error}
          />
        }
      />
    </Box>
  );
};
