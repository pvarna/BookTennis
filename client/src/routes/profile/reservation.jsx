import { Button, CircularProgress } from "@mui/material";
import { useAsyncAction } from "../../hooks/use-async-action";
import { reservationService } from "../../services/reservation-service";
import { ErrorContainer } from "../../components/error-container";
import { useState } from "react";
import { Modal } from "../../components/modal/modal";
import { socket } from "../../services/socket";
import { DateTime } from "luxon";
import { successToast } from "../../utils/customToast";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";

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
    socket.emit("modify-reservation");
    successToast("Reservation cancelled!");
  });

  if (loading) {
    return <CircularProgress />;
  }

  const canDelete = DateTime.fromISO(reservation.startTime) >= DateTime.now();

  return (
    <>
      <TableRow
        key={reservation.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
        {reservation.id}
        </TableCell>
        <TableCell align="center">{reservation.courtId}</TableCell>
        <TableCell align="center">
          {new Date(reservation.startTime).toLocaleDateString("en-US")}
        </TableCell>
        <TableCell align="center">
          {new Date(reservation.startTime).toLocaleTimeString("en-US")}
        </TableCell>
        <TableCell align="center">{reservation.durationInMinutes}</TableCell>

        <TableCell align="center">
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setIsOpen(true)}
            disabled={!canDelete}
          >
            Cancel
          </Button>
        </TableCell>
      </TableRow>

      <Modal
        isOpen={isOpen}
        title={`Are you sure you want to cancel this reservation?`}
        content={
          !!error?.message && (
            <ErrorContainer error={`Error canceling reservation: ${error.message}`} />
          )
        }
        onAccept={deleteReservation}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};
