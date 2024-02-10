import { useState } from 'react';
import { useAsyncAction } from '../../hooks/use-async-action';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { ErrorContainer } from '../../components/error-container';
import { userService } from '../../services/user-service';
import { Flex } from '../../components/flex';

export const EditForm = ({ user, onSubmit, onCancel }) => {
  const [userData, setUserData] = useState({
    fullName: user.fullName,
    phone: user.phone,
  });

  const {
    error,
    loading,
    trigger: updateInfo,
  } = useAsyncAction(async (e) => {
    e.preventDefault();

    await userService.updateUserInfo(user.id, userData);

    onSubmit();
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      component='form'
      onSubmit={updateInfo}
    >
      <TextField
        margin='normal'
        fullWidth
        label='Full name'
        autoFocus
        value={userData.fullName}
        onChange={(event) =>
          setUserData({ ...userData, fullName: event.target.value })
        }
      />
      <TextField
        margin='normal'
        fullWidth
        label='Phone'
        autoFocus
        value={userData.phone}
        onChange={(event) =>
          setUserData({ ...userData, phone: event.target.value })
        }
      />
      <Flex>
        <Button variant='contained' type='submit' sx={{ minWidth: '150px' }}>
          Save
        </Button>
        <Button
          variant='contained'
          type='button'
          onClick={onCancel}
          sx={{ minWidth: '150px' }}
        >
          Cancel
        </Button>
      </Flex>
      {!!error?.message && (
        <ErrorContainer error={'Error updating user info'} />
      )}
    </Box>
  );
};
