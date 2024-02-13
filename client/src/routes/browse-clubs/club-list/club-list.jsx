import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography, Button
} from "@mui/material";
import { Flex } from "../../../components/flex";
import { EmptyTable } from "../../../components/empty-table/empty-table";
import { useNavigate } from 'react-router-dom';

export const ClubList = ({
  clubs,
  isInitial,
}) => {
  const navigate = useNavigate()

  if (clubs.length === 0 && !isInitial) {
    return (
      <EmptyTable
        title="No results match your search"
        content="Try to change your filters and search again. Remove all filters and
    search again to show all clubs and courts."
      />
    );
  }

  return (
    <Flex
      flexDirection="row"
      sx={{ my: 6, mx: 4, alignItems: "center", width: "100%", padding: "20px" }}
    >
      {clubs.map((club) => (
        <Flex key={club.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="../../../../ben-hershey-unsplash.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {club.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Located in : {club.city}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => navigate(`/club/${club.id}`)}>View courts</Button>
            </CardActions>
          </Card>
        </Flex>
      ))}
     
    </Flex>
  );
};
