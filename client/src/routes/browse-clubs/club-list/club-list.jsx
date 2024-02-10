import { Typography, Container, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Flex } from '../../../components/flex';

const NoClubsFound = () => {
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
      <Flex flexDirection='column' sx={{ alignItems: 'center' }}>
        <SearchIcon sx={{ fontSize: '80px', color: '#EE7214' }} />
        <Typography component='h1' variant='h5' sx={{ mt: 2 }}>
          No results match your search
        </Typography>
        <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
          Try to change your filters and search again. Remove all filters and
          search again to show all clubs and courts.
        </Typography>
      </Flex>
    </Container>
  );
};

export const ClubList = ({
  clubs,
  isInitial,
  page,
  pageSize,
  total,
  onPageChange,
  onRowsPerPageChange,
}) => {
  if (clubs.length === 0 && !isInitial) {
    return <NoClubsFound />;
  }

  return (
    <Flex flexDirection='column' sx={{ my: 6, mx: 4, alignItems: 'center' }}>
      {clubs.map((club) => (
        <Flex key={club.id}>
          <Link to={`/club/${club.id}`}>{`${club.name}, ${club.city}`}</Link>
        </Flex>
      ))}
      {total > 0 && (
        <TablePagination
          count={total}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={pageSize}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </Flex>
  );
};
