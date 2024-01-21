import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { COURT_SURFACES, Cities } from "../../constants";
import { useRef, useState } from "react";
import { useAsyncAction } from "../../hooks/use-async-action";
import { ErrorContainer } from "../../components/error-container";
import { clubService } from "../../services/club-service";
import { ClubList } from "./club-list/club-list";
import { Flex } from "../../components/flex";
import { Page } from "../../components/page/page";

export const BrowseClubs = () => {
  const initialRenderRef = useRef(true);
  const [filters, setFilters] = useState({
    city: "",
    surfaces: [],
  });
  const [clubs, setClubs] = useState([]);

  const {
    error,
    loading,
    trigger: handleSubmit,
  } = useAsyncAction(async (event) => {
    event.preventDefault();

    const clubs = await clubService.loadClubs(filters.city, filters.surfaces);
    setClubs(clubs);
    initialRenderRef.current = false;
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Page>
      <Grid item xs={12} component={Paper} elevation={3} square>
        <Box
          sx={{
            my: 6,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3" color="#EE7214">
            Browse clubs and courts
          </Typography>
        </Box>
      </Grid>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          paddingTop: "20px",
          display: "flex",
          width: "100%",
          marginLeft: "30%",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Flex
          flexDirection="row"
          gap="8px"
          sx={{
            alignItems: "center",
          }}
        >
          <InputLabel id="city-select-label">City</InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            value={filters.city}
            label="City"
            onChange={(event) =>
              setFilters({ ...filters, city: event.target.value })
            }
            sx={{
              width: "150px",
            }}
          >
            {Cities.map((city) => (
              <MenuItem key={city.value} value={city.value}>
                {city.label}
              </MenuItem>
            ))}
          </Select>
        </Flex>
        <Flex
          flexDirection="row"
          gap="8px"
          sx={{
            alignItems: "center",
          }}
        >
          <InputLabel id="surface-select-label">Surface</InputLabel>
          <Select
            labelId="surface-select-label"
            id="surface-select"
            value={filters.surfaces}
            label="Surface"
            multiple
            onChange={(event) =>
              setFilters({ ...filters, surfaces: event.target.value })
            }
            sx={{
              width: "150px",
            }}
          >
            {COURT_SURFACES.map((surface) => (
              <MenuItem key={surface} value={surface}>
                {surface}
              </MenuItem>
            ))}
          </Select>
        </Flex>
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "#EE7214", width: "200px" }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            setFilters({
              city: "",
              surfaces: [],
            })
          }
          sx={{ backgroundColor: "#EE7214", width: "200px" }}
        >
          Clear filters
        </Button>
      </Box>
      {!!error?.message && <ErrorContainer error={error.message} />}

      <ClubList clubs={clubs} isInitial={initialRenderRef.current} />
    </Page>
  );
};
