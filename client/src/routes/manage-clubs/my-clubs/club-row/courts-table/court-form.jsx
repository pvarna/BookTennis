import { useState } from 'react';
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Flex } from '../../../../../components/flex';
import { COURT_SURFACES } from '../../../../../constants';
import { ErrorContainer } from '../../../../../components/error-container';

export const CourtForm = ({
  onCancel,
  onConfirm,
  error,
  defaultValues = { surface: null, price: null },
}) => {
  const [courtDetials, setCourtDetails] = useState(defaultValues);

  return (
    <Box
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        onConfirm(courtDetials);
      }}
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
        type='number'
        margin='normal'
        required
        fullWidth
        label='Price'
        autoFocus
        value={courtDetials.price}
        onChange={(event) =>
          setCourtDetails({ ...courtDetials, price: event.target.value })
        }
      />
      <Flex flexDirection='column' sx={{ alignItems: 'center' }}>
        <InputLabel id='surface-select-label' sx={{ alignSelf: 'flex-start' }}>
          Surface
        </InputLabel>
        <Select
          required
          labelId='surface-select-label'
          id='surface-select'
          value={courtDetials.surface}
          label='Surface'
          onChange={(event) =>
            setCourtDetails({ ...courtDetials, surface: event.target.value })
          }
          sx={{ width: '200px' }}
        >
          {COURT_SURFACES.map((surface) => (
            <MenuItem key={surface} value={surface}>
              {surface}
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
          Save
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
      {!!error?.message && <ErrorContainer error={'Error creating court'} />}
    </Box>
  );
};
