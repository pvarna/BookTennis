import { Box } from '@mui/material';

export const Flex = ({ flexDirection = 'row', gap = '8px', sx, children }) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: flexDirection, gap: gap, ...sx }}
    >
      {children}
    </Box>
  );
};
