import React from "react";
import { useSelector, useDispatch } from "react-redux";

import TripPlannerListItem from "./TripPlannerListItem";
import GetStarted from "../GetStarted/GetStarted";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function TripPlanner() {
  const dispatch = useDispatch();

  const { tripPlanner } = useSelector((store) => store.trip);

  React.useEffect(() => {
    dispatch({ type: "MOVE_TO_PLANNER" });
    dispatch({ type: "FETCH_TRIP_LISTS" });
  }, []);

  return (
    <Container className="background" component="main" sx={{ px: 2, py: 10 }}>
      {tripPlanner?.length > 0 ? (
        <Grid container spacing={2} justifyContent="center" mt={0}>
          {tripPlanner.map((trip) => (
            <Grid item key={trip.id}>
              <TripPlannerListItem trip={trip} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <GetStarted tripPlannerEmpty={true} />
      )}
    </Container>
  );
}
