import { Box, Button, CircularProgress } from '@mui/material';
import { Flex } from '../../components/flex';
import { DateTimeRange } from '../../components/date-time-range/date-time-range';
import { useAsyncAction } from '../../hooks/use-async-action';
import { reservationService } from '../../services/reservation-service';
import { ErrorContainer } from '../../components/error-container';
import { useState } from 'react';
import { Modal } from '../../components/modal/modal';
import { socket } from '../../services/socket';
import { DateTime } from 'luxon';
import { successToast } from '../../utils/customToast';

export const Reservation = ({ reservation, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    error,
    loading,
    trigger: deleteReservation,
  } = useAsyncAction(async () => {
    await reservationService.deleteReservation(reservation.id);
    setIsOpen(false);
    onDelete();
    socket.emit('modify-reservation');
    successToast('Reservation cancelled!')
  });

  if (loading) {
    return <CircularProgress />;
  }

  const canDelete = DateTime.fromISO(reservation.startTime) >= DateTime.now();

  return (
    <Flex
      key={reservation.id}
      flexDirection='column'
      sx={{
        alignItems: 'flex-start',
        border: '1px solid black',
        borderRadius: '16px',
        padding: '8px',
      }}
    >
      <Box>{`Court id: ${reservation.courtId}`}</Box>
      <DateTimeRange
        startTime={reservation.startTime}
        duration={reservation.durationInMinutes}
      />
      {canDelete && (
        <Button variant='destructive' onClick={() => setIsOpen(true)}>
          Cancel
        </Button>
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
    </Flex>
  );
};
