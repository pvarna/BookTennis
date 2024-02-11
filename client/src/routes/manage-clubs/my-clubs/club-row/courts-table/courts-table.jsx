import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Flex } from '../../../../../components/flex';
import { Popup } from '../../../../../components/popup/popup';
import AddIcon from '@mui/icons-material/Add';
import { CourtForm } from './court-form';
import { CourtRow } from './court-row';
import { useAsyncAction } from '../../../../../hooks/use-async-action';
import { courtService } from '../../../../../services/court-service';

export const CourtsTable = ({ courts, isOpen, clubId, onAction }) => {
  const [isAddCourtModalOpen, setIsAddCourtModalOpen] = useState(false);
  const {
    loading,
    error,
    trigger: createCourt,
  } = useAsyncAction(async (courtDetails) => {
    await courtService.addCourt(courtDetails, clubId);
    onAction();
    setIsAddCourtModalOpen(false);
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={isOpen} timeout='auto' unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Flex sx={{ alignItems: 'center' }}>
            <Typography variant='h6'>Courts</Typography>
            <IconButton onClick={() => setIsAddCourtModalOpen(true)}>
              <AddIcon />
            </IconButton>
            <Popup
              open={isAddCourtModalOpen}
              title={'Add court'}
              content={
                <CourtForm
                  onCancel={() => setIsAddCourtModalOpen(false)}
                  onConfirm={createCourt}
                  error={error}
                />
              }
            />
          </Flex>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Surface</TableCell>
                <TableCell align='center'>Price ($)</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courts.map((court) => (
                <CourtRow key={court.id} court={court} onAction={onAction} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  );
};
