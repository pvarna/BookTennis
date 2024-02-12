import { Box, CircularProgress, Typography, Grid, Paper } from "@mui/material";
import { useAsync } from "../../hooks/use-async";
import { clubService } from "../../services/club-service";
import { ErrorContainer } from "../../components/error-container";
import { useParams } from "react-router-dom";
import { TimeSlots } from "./time-slots";
import { useState } from "react";
import { DateTime } from "luxon";
import { Flex } from "../../components/flex";
import { DatePicker } from "@mui/x-date-pickers";
import { Page } from "../../components/page/page";
import { socket } from "../../services/socket";
import { useSocket } from "../../hooks/use-socket";
import { SocketEmittedEvents, SocketEvent } from "../../types";

export const Club = () => {
  const { clubId } = useParams();
  const [date, setDate] = useState(DateTime.now());

  const { data, loading, error, reload } = useAsync(
    async () => await clubService.loadCLubInfo(clubId, date),
    [clubId, date]
  );

  useSocket(SocketEmittedEvents.REFETCH_RESERVATIONS, () => reload());

  if (loading) {
    return <CircularProgress />;
  }

  if (!data?.club && !error?.message) {
    return <ErrorContainer error={"Invalid club id"} />;
  }

  return (
    <Page>
      <Grid item xs={12} component={Paper} elevation={3} square>
        <Box
          sx={{
            my: 6,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3" color="#EE7214">
            {data?.club.name}
          </Typography>
        </Box>
      </Grid>

      <Box
        sx={{
          py: "30px",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <DatePicker
          label="Choose date"
          value={date}
          onChange={(value) => setDate(value)}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          marginLeft: "5%",
        }}
      >
        {!!data?.club &&
          data.club.courts.map((court) => (
            <Flex
              key={court.id}
              flexDirection="row"
              sx={{ alignItems: "start" }}
            >
              <Flex flexDirection="column">
                <Typography>{`Surface: ${court.surface}`}</Typography>
                <Typography>{`Price: ${court.price}`}</Typography>
              </Flex>
              <TimeSlots
                courtId={court.id}
                reservations={court.reservations}
                date={date}
                onReservationMade={() =>
                  socket.emit(SocketEvent.MODIFY_RESERVATION)
                }
              />
            </Flex>
          ))}
        {!!error?.message && <ErrorContainer error={error.message} />}
      </Box>
    </Page>
  );
};
