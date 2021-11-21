import React from "react";
import { useSelector, useDispatch } from "react-redux";

import TripPlannerItem from "../TripPlannerItem/TripPlannerItem";
import GetStarted from "../GetStarted/GetStarted";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function TripPlanner() {
  const dispatch = useDispatch();

  const { tripPlanner } = useSelector((store) => store.trip);

  React.useEffect(() => {
    dispatch({ type: "FETCH_TRIP_LISTS" });
  }, []);

  return (
    <Container component="main">
      <Typography component="h1" variant="h3">
        Planner
      </Typography>
      {tripPlanner?.length > 0 ? (
        <Grid container spacing={2} justifyContent="center" mt={0}>
          {tripPlanner.map((trip) => (
            <Grid item key={trip.parkCode}>
              <TripPlannerItem trip={trip} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <GetStarted tripPlannerEmpty={true} />
      )}
    </Container>
  );
}
