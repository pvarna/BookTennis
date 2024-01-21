import { Box, CircularProgress, Typography } from '@mui/material';
import { useAsync } from '../../hooks/use-async';
import { clubService } from '../../services/club-service';
import { ErrorContainer } from '../../components/error-container';
import { useParams } from 'react-router-dom';
import { TimeSlots } from './time-slots';
import { useState } from 'react';
import { DateTime } from 'luxon';
import { Flex } from '../../components/flex';
import { DatePicker } from '@mui/x-date-pickers';

export const Club = () => {
  const { clubId } = useParams();
  const [date, setDate] = useState(DateTime.now());

  const { data, loading, error } = useAsync(
    async () => await clubService.loadCLubInfo(clubId, date),
    [clubId]
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (!data?.club) {
    return <ErrorContainer error={"Invalid club id"}/>
  }

  return (
    <Box>
      <Typography variant='h2'>{data?.club.name}</Typography>
      <DatePicker
        label='Choose date'
        value={date}
        onChange={(value) => setDate(value)}
      />
      {!!data?.club &&
        data.club.courts.map((court) => (
          <Flex
            key={court.id}
            flexDirection='column'
            sx={{ alignItems: 'start' }}
          >
            <Flex flexDirection='column'>
              <Typography>{`Surface: ${court.surface}`}</Typography>
              <Typography>{`Price: ${court.price}`}</Typography>
            </Flex>
            <TimeSlots
              courtId={court.id}
              reservations={court.reservations}
              date={date}
            />
          </Flex>
        ))}
      {!!error?.message && <ErrorContainer error={error.message} />}
    </Box>
  );
};
