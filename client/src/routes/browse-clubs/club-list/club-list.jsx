import { TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { Flex } from '../../../components/flex';
import { EmptyTable } from '../../../components/empty-table/empty-table';

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
    return (
      <EmptyTable
        title='No results match your search'
        content='Try to change your filters and search again. Remove all filters and
    search again to show all clubs and courts.'
      />
    );
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
