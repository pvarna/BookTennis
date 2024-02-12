import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useAsync } from "../../../hooks/use-async";
import { clubService } from "../../../services/club-service";
import { ErrorContainer } from "../../../components/error-container";
import { ClubDetailsRow } from "./club-row/club-details-row";
import InventoryIcon from '@mui/icons-material/Inventory';

export const MyClubs = () => {
  const { id } = useCurrentUser();
  const { data, loading, error, reload } = useAsync(
    async () => await clubService.loadClubsForUser(id),
    [id]
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (!loading && !data?.clubs) {
    return null;
  }

  return (
  
    <Box sx={{alignItems:'center', width: '100%'}}>
      <Typography variant="h4" sx={{paddingBottom: '50px'}}>My Clubs</Typography>
      {data.clubs.length === 0 && (
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <InventoryIcon sx={{ fontSize: '80px', color: '#EE7214' }} />
        <Typography component='h1' variant='h5' sx={{ mt: 2 }}>
        You don't have any clubs yet
        </Typography>
        <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
          Try creating a club
        </Typography>
      </Box>
      )}
      {data.clubs.length > 0 && (
        <TableContainer sx={{ th: { width: 200 } }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.clubs.map((club) => (
                <ClubDetailsRow key={club.id} club={club} onAction={reload} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!!error?.message && <ErrorContainer error={"Error loading club"} />}
    </Box>

  );
};
