import { Container, Typography } from '@mui/material';
import { Flex } from '../flex';
import SearchIcon from '@mui/icons-material/Search';

export const EmptyTable = ({ title, content }) => {
  return (
    <Container
      maxWidth='xs'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}
    >
      <Flex flexDirection='column' gap='2px' sx={{ alignItems: 'center' }}>
        <SearchIcon sx={{ fontSize: '80px', color: '#EE7214' }} />
        <Typography component='h1' variant='h5' sx={{ mt: 2 }}>
          {title}
        </Typography>
        <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
          {content}
        </Typography>
      </Flex>
    </Container>
  );
};
