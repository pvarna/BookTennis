import { CircularProgress, IconButton, TableCell } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAsyncAction } from '../../hooks/use-async-action';
import { reservationService } from '../../services/reservation-service';
import { ErrorContainer } from '../../components/error-container';
import { useState } from 'react';
import { Modal } from '../../components/modal/modal';
import { socket } from '../../services/socket';
import { DateTime } from 'luxon';
import { successToast } from '../../utils/customToast';

export const ReservationRow = ({ reservation, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const start = DateTime.fromISO(reservation.startTime);
  const end = start.plus({ minutes: reservation.durationInMinutes });

  const {
    error,
    loading,
    trigger: deleteReservation,
  } = useAsyncAction(async () => {
    await reservationService.deleteReservation(reservation.id);
    setIsOpen(false);
    onDelete();
    socket.emit('modify-reservation');
    successToast('Reservation cancelled!');
  });

  if (loading) {
    return <CircularProgress />;
  }

  const canDelete = start.diff(DateTime.now(), 'hours').hours > 2;

  return (
    <>
      <TableCell align='center'>{start.toFormat('dd/LLL/yyyy')}</TableCell>
      <TableCell align='center'>
        {start.toFormat('HH:mm')} - {end.toFormat('HH:mm')}
      </TableCell>
      <TableCell align='center'>
        {canDelete ? (
          <IconButton onClick={() => setIsOpen(true)} color='error'>
            <DeleteOutlineIcon />
          </IconButton>
        ) : (
          <>-</>
        )}
        <Modal
          isOpen={isOpen}
          title={`Are you sure you want to cancel this reservation?`}
          content={
            !!error?.message && (
              <ErrorContainer error={'Error canceling reservation'} />
            )
          }
          onAccept={deleteReservation}
          onCancel={() => setIsOpen(false)}
        />
      </TableCell>
    </>
  );
};
