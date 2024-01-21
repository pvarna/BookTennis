import { Typography } from '@mui/material';

export const ErrorContainer = ({ error }) => {
  return <Typography sx={{ color: 'red' }}>{error}</Typography>;
};
