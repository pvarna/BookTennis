import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Flex } from '../../components/flex';
import { useAsync } from '../../hooks/use-async';
import { userService } from '../../services/user-service';
import { ErrorContainer } from '../../components/error-container';
import { useState } from 'react';
import { EditForm } from './edit-form';

export const UserDetails = ({ userId }) => {
  const [isEditting, setIsEditting] = useState(false);
  const {
    data: user,
    loading,
    error,
    reload,
  } = useAsync(async () => await userService.loadUser(userId), [userId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!loading && !user) {
    return null;
  }

  return (
    <Box>
      <Flex flexDirection='column' sx={{ alignItems: 'flex-start' }}>
        {isEditting ? (
          <EditForm
            user={user}
            onSubmit={() => {
              reload();
              setIsEditting(false);
            }}
            onCancel={() => setIsEditting(false)}
          />
        ) : (
          <>
            <Typography>{`Full name: ${user.fullName}`}</Typography>
            <Typography>{`Email: ${user.email}`}</Typography>
            <Typography>{`Phone: ${user.phone}`}</Typography>
          </>
        )}
        {!isEditting && (
          <Button
            sx={{ backgroundColor: '#EE7214', maxWidth: '200px' }}
            variant='contained'
            onClick={() => setIsEditting(true)}
          >
            Edit
          </Button>
        )}
      </Flex>
      {!!error?.message && <ErrorContainer error={'Error loading user info'} />}
    </Box>
  );
};
