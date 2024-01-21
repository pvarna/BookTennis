import { Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export const ClubList = ({ clubs, isInitial }) => {
  if (clubs.length === 0 && !isInitial) {
    return (
      <>
       <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SearchIcon sx={{ fontSize: "80px", color: "#EE7214" }} />
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            No results match your search
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Try to change your filters and search again. Remove all filters and search again to
            show all clubs and courts.
          </Typography>
        </Box>
        </Container>
      </>
    );
  }

  return (
    <Box
      sx={{
        my: 6,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {clubs.map((club) => (
        <Box key={club.id} sx={{ display: "flex", gap: "8px" }}>
          <Link to={`/club/${club.id}`}>{club.name}</Link>
        </Box>
      ))}
    </Box>
  );
};
