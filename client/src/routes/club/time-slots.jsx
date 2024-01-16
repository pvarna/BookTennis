import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Flex } from '../../components/flex';
import { range } from '../../utils/lib';
import { useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { useAsyncAction } from '../../hooks/use-async-action';
import { reservationService } from '../../services/reservation-service';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ErrorContainer } from '../../components/error-container';

function areSameDate(date, otherDate) {
  return (
    date.hasSame(otherDate, 'day') &&
    date.hasSame(otherDate, 'month') &&
    date.hasSame(otherDate, 'year')
  );
}

// TODO: Add a migration and get start and end hour from the database
export const TimeSlots = ({
  courtId,
  reservations,
  date,
  clubStartHour = 9,
  clubEndHour = 22,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(undefined);
  const slots = range(clubStartHour, clubEndHour - 1);
  const user = useCurrentUser();

  const {
    trigger: handleSubmit,
    error,
    loading,
  } = useAsyncAction(async () => {
    await reservationService.makeReservation({
      startingTime: date.startOf('day').plus({ hours: selectedSlot }),
      userId: user.id,
      courtId,
    });

    setIsOpen(false);
    setSelectedSlot(undefined);
  });

  const reservedHours = useMemo(
    () =>
      reservations
        .filter((r) => areSameDate(DateTime.fromISO(r.startTime), date))
        .map((r) => {
          const start = DateTime.fromISO(r.startTime).hour;
          const end = start + r.durationInMinutes / 60 - 1;

          return range(start, end);
        })
        .flat(),
    [reservations, date]
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Flex flexDirection='column'>
      {slots.map((slot) => (
        <Button
          disabled={reservedHours.includes(slot)}
          key={slot}
          onClick={() => {
            setSelectedSlot(slot);
            setIsOpen(true);
          }}
          sx={{
            border: '1px solid black',
            color: 'black',
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: 'green',
            '&.Mui-disabled': {
              background: 'red',
              color: 'black',
            },
          }}
        >{`${slot}:00 - ${slot + 1}:00`}</Button>
      ))}
      <Dialog open={isOpen}>
        <DialogTitle>
          {`Are you sure you want to reserve this court for 
          ${selectedSlot}:00 - ${selectedSlot + 1}:00`}
        </DialogTitle>
        <DialogContent>
          {!!error?.message && <ErrorContainer message={error.message} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>yes</Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              setSelectedSlot(undefined);
            }}
          >
            no
          </Button>
        </DialogActions>
      </Dialog>
    </Flex>
  );
};
