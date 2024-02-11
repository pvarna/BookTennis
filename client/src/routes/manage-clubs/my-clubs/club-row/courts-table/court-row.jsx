import { useState } from 'react';
import { useAsyncAction } from '../../../../../hooks/use-async-action';
import { courtService } from '../../../../../services/court-service';
import {
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';
import { Modal } from '../../../../../components/modal/modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ErrorContainer } from '../../../../../components/error-container';
import { CourtForm } from './court-form';
import { Popup } from '../../../../../components/popup/popup';

const UpdateCourt = ({ court, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    loading: updating,
    error,
    trigger: updateCourt,
  } = useAsyncAction(async (courtDetails) => {
    await courtService.updateCourt(courtDetails, court.clubId, court.id);
    onAction();
    setIsOpen(false);
  });

  if (updating) {
    return <CircularProgress />;
  }
  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <EditIcon />
      </IconButton>
      <Popup
        open={isOpen}
        title={'Edit court'}
        content={
          <CourtForm
            onCancel={() => setIsOpen(false)}
            onConfirm={updateCourt}
            error={error}
            defaultValues={{ surface: court.surface, price: court.price }}
          />
        }
      />
    </>
  );
};

const DeleteCourt = ({ court, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    loading: deleting,
    error,
    trigger: deleteCourt,
  } = useAsyncAction(async () => {
    await courtService.deleteCourt(court.id, court.clubId);
    onAction();
    setIsOpen(false);
  });

  if (deleting) {
    return <CircularProgress />;
  }

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <DeleteOutlineIcon />
      </IconButton>
      <Modal
        isOpen={isOpen}
        title={'Deleting court. Are you sure?'}
        content={
          !!error?.message && <ErrorContainer error={'Error deleting court'} />
        }
        onCancel={() => setIsOpen(false)}
        onAccept={deleteCourt}
        disableAccept={!!error}
      />
    </>
  );
};

export const CourtRow = ({ court, onAction }) => {
  return (
    <TableRow key={court.id}>
      <TableCell scope='row' align='center'>
        {court.surface}
      </TableCell>
      <TableCell align='center'>{court.price}</TableCell>
      <TableCell align='center'>
        <UpdateCourt court={court} onAction={onAction} />
        <DeleteCourt court={court} onAction={onAction} />
      </TableCell>
    </TableRow>
  );
};
