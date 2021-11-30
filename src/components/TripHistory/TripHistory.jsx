import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TripHistoryListItem from "./TripHistoryListItem";
import GetStarted from "../GetStarted/GetStarted";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function TripHistory() {
  const dispatch = useDispatch();

  const { tripHistory } = useSelector((store) => store.trip);

  useEffect(() => {
    dispatch({ type: "FETCH_TRIP_LISTS" });
    dispatch({ type: "MOVE_TO_HISTORY" });
  }, [dispatch]);

  return (
    <Container component="main" sx={{ px: 0, py: 10 }}>
      {tripHistory?.length > 0 ? (
        <Grid container spacing={2} justifyContent="center" mt={0}>
          {tripHistory.map((trip) => (
            <Grid item key={trip.id}>
              <TripHistoryListItem trip={trip} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <GetStarted tripHistoryEmpty={true} />
      )}
    </Container>
  );
}
