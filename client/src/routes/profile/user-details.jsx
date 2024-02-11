import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import { Flex } from '../../components/flex';
import { useAsync } from '../../hooks/use-async';
import { userService } from '../../services/user-service';
import { ErrorContainer } from '../../components/error-container';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
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
      <Flex gap="20px" sx={{padding: '8px'}}>
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
          <Flex flexDirection='column' sx={{ alignItems: 'flex-start' }}>
            <Typography>{`Full name: ${user.fullName}`}</Typography>
            <Typography>{`Email: ${user.email}`}</Typography>
            <Typography>{`Phone: ${user.phone}`}</Typography>
          </Flex>
        )}
        {!isEditting && (
          <IconButton onClick={() => setIsEditting(true)}>
            <EditIcon />
          </IconButton>
        )}
      </Flex>
      {!!error?.message && <ErrorContainer error={'Error loading user info'} />}
    </Box>
  );
};
