import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'

export const ClubList = ({ clubs }) => {
  if (clubs.length === 0) {
    return <Typography variant='h3'> No available clubs</Typography>;
  }

  return (
    <Box>
      {clubs.map((club) => (
        <Box key={club.id} sx={{ display: 'flex', gap: '8px' }}>
          <Link to={`/club/${club.id}`}>{club.name}</Link>
        </Box>
      ))}
    </Box>
  );
};
