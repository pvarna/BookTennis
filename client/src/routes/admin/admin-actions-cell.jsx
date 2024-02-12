import {
  CircularProgress,
  IconButton,
  TableCell,
  Typography,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Modal } from '../../components/modal/modal';
import { useAsyncAction } from '../../hooks/use-async-action';
import { ErrorContainer } from '../../components/error-container';
import { clubCreationRequestService } from '../../services/club-creation-request-service';

export const AdminActionsCell = ({ request, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [accepting, setAccepting] = useState(false);

  const {
    loading,
    error,
    trigger: onConfirm,
  } = useAsyncAction(async () => {
    await clubCreationRequestService.changeRequestStatus(
      request.id,
      accepting ? 'Accepted' : 'Cancelled'
    );

    onAction();
    setIsOpen(false);
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (request.status !== 'Pending') {
    return <TableCell align='center'>-</TableCell>;
  }

  return (
    <TableCell align='center'>
      <IconButton
        onClick={() => {
          setIsOpen(true);
          setAccepting(true);
        }}
      >
        <DoneIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          setIsOpen(true);
          setAccepting(false);
        }}
      >
        <CloseIcon />
      </IconButton>
      <Modal
        isOpen={isOpen}
        title='Are you sure?'
        content={
          <>
            <Typography>
              You are going to {accepting ? 'accept' : 'cancel'} this request,
              are you sure?
            </Typography>
            {!!error?.message && (
              <ErrorContainer error={'Something went wrong'} />
            )}
          </>
        }
        onCancel={() => setIsOpen(false)}
        onAccept={onConfirm}
      />
    </TableCell>
  );
};
