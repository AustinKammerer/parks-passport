import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import GetStarted from "../GetStarted/GetStarted";
import CurrentTrip from "../CurrentTrip/CurrentTrip";
import TripPlanner from "../TripPlanner/TripPlanner";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "FETCH_TRIP_LISTS" });
  }, []);

  const user = useSelector((store) => store.user);
  const { tripPlanner, currentTrip } = useSelector((store) => store.trip);

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h2" variant="h4">
        Welcome, {user.username}!
      </Typography>
      {/* {currentTrip?.length > 0 ? (
        <CurrentTrip />
      ) : tripPlanner?.length > 0 ? (
        <TripPlanner />
      ) : (
        <GetStarted user={user} />
      )} */}
      <Stack spacing={2}>
        <Button
          size="large"
          variant="contained"
          onClick={() => history.push("/current")}
        >
          Current Trip
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => history.push("/planner")}
        >
          Planner
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => history.push("/finder")}
        >
          Finder
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => history.push("/history")}
        >
          History
        </Button>
      </Stack>

      {/* <LogOutButton className="btn" /> */}
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
