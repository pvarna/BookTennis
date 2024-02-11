import { IconButton, TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CourtsTable } from './courts-table/courts-table';

export const ClubDetailsRow = ({ club, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size='small' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell scope='row' align='center'>
          {club.name}
        </TableCell>
        <TableCell align='center'>{club.city}</TableCell>
      </TableRow>
      <TableRow>
        <CourtsTable
          isOpen={isOpen}
          courts={club.courts}
          clubId={club.id}
          onAction={onAction}
        />
      </TableRow>
    </>
  );
};
