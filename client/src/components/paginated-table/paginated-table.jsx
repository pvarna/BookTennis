import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

export const PaginatedTable = ({
  headers,
  total,
  pagination,
  setPagination,
  children,
}) => {
  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell align='center'>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={total}
                page={pagination.page}
                onPageChange={(_, page) =>
                  setPagination({ ...pagination, page })
                }
                rowsPerPage={pagination.pageSize}
                onRowsPerPageChange={(e) =>
                  setPagination({
                    page: 0,
                    pageSize: parseInt(e.target.value),
                  })
                }
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};
