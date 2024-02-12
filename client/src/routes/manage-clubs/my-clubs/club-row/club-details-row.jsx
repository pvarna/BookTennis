import {
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CourtsTable } from './courts-table/courts-table';
import { useAsyncAction } from '../../../../hooks/use-async-action';
import { clubService } from '../../../../services/club-service';
import { ErrorContainer } from '../../../../components/error-container';
import { Modal } from '../../../../components/modal/modal';

const DeleteClubCell = ({ clubId, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    loading: deleting,
    error,
    trigger: deleteClub,
  } = useAsyncAction(async () => {
    await clubService.deleteClub(clubId);
    onAction();
    setIsOpen(false);
  });

  if (deleting) {
    return <CircularProgress />;
  }

  return (
    <TableCell align='center'>
      <IconButton onClick={() => setIsOpen(true)} color="error">
        <DeleteOutlineIcon />
      </IconButton>
      <Modal
        isOpen={isOpen}
        title={'Deleting club. Are you sure?'}
        content={
          !!error?.message && <ErrorContainer error={'Error deleting club'} />
        }
        onCancel={() => setIsOpen(false)}
        onAccept={deleteClub}
        disableAccept={!!error}
      />
    </TableCell>
  );
};

export const ClubDetailsRow = ({ club, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size='small' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell scope='row' align='center'>
          {club.name}
        </TableCell>
        <TableCell align='center'>{club.city}</TableCell>
        <DeleteClubCell clubId={club.id} onAction={onAction}/>
      </TableRow>
      <TableRow>
        <CourtsTable
          isOpen={isOpen}
          courts={club.courts}
          clubId={club.id}
          onAction={onAction}
        />
      </TableRow>
    </>
  );
};
