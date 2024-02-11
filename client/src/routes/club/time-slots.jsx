import { Button, CircularProgress } from "@mui/material";
import { Flex } from "../../components/flex";
import { range } from "../../utils/lib";
import { useMemo, useState } from "react";
import { DateTime } from "luxon";
import { useAsyncAction } from "../../hooks/use-async-action";
import { reservationService } from "../../services/reservation-service";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { ErrorContainer } from "../../components/error-container";
import { Modal } from "../../components/modal/modal";
import { successToast } from "../../utils/customToast";
import { alpha } from "@mui/material";

const areSameDate = (date, otherDate) => {
  return (
    date.hasSame(otherDate, "day") &&
    date.hasSame(otherDate, "month") &&
    date.hasSame(otherDate, "year")
  );
};

const isPast = (date, hour) => date.set({ hour: hour }) < DateTime.now();

// TODO: Add a migration and get start and end hour from the database
export const TimeSlots = ({
  courtId,
  reservations,
  date,
  onReservationMade,
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
      userId: user?.id,
      courtId,
    });

    onReservationMade();
    setIsOpen(false);
    setSelectedSlot(undefined);
    successToast('Reservation made successfully!');
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
    <Flex
      flexDirection='row'
      sx={{ alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}
    >
      {slots.map((slot) => (
        <Button
          disabled={reservedHours.includes(slot) || isPast(date, slot)}
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
            backgroundColor: alpha(
              reservedHours.includes(slot) ? "#ff9999" : "#BED754",
              isPast(date, slot) ? 0.5 : 1
            ),
          }}
        >{`${slot}:00 - ${slot + 1}:00`}</Button>
      ))}
      <Modal
        isOpen={isOpen}
        title={`Are you sure you want to reserve this court for 
          ${selectedSlot}:00 - ${selectedSlot + 1}:00?`}
        content={!!error?.message && <ErrorContainer error={error.message} />}
        onAccept={handleSubmit}
        onCancel={() => {
          setSelectedSlot(undefined);
          setIsOpen(false);
        }}
        disableAccept={!!error}
      />
    </Flex>
  );
};
