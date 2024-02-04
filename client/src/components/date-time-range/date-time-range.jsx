import { Box } from '@mui/material';
import { DateTime } from 'luxon';
import { Flex } from '../flex';

export const DateTimeRange = ({ startTime, duration, sx = {} }) => {
  const start = DateTime.fromISO(startTime);
  const end = start.plus({ minutes: duration });
  return (
    <Flex flexDirection='column' sx={{alignItems: 'flex-start', ...sx}}>
      <Box>{`Date: ${start.toFormat('dd/LLL/yyyy')}`}</Box>
      <Box>{`Hour: ${start.toFormat('HH:mm')} - ${end.toFormat('HH:mm')}`}</Box>
    </Flex>
  );
};
