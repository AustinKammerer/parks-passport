import React from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function GetStarted(props) {
  const history = useHistory();

  const currentTrip = useSelector((store) => store.trip);
  const currentTripPath = `/current/log/${
    currentTrip.length ? currentTrip[0].id : "null"
  }`;

  // conditionally render the messages as well as button action
  let destination;
  let message;
  let path;
  if (props.currentTripEmpty && !props.tripPlannerEmpty) {
    destination = "Planner";
    message = "It doesn't look like you have an active trip yet...";
    path = "/planner";
  } else if (props.tripPlannerEmpty) {
    destination = "Use the Park Finder to get started!";
    message = "It doesn't look like you have any trips planned yet...";
    path = "/finder";
  } else {
    destination = "Use the Park Finder to get started!";
    message = "It doesn't look like you have any trips planned yet...";
    path = "/finder";
  }
  console.log(currentTrip[0]);
  return (
    <Box pt={3}>
      <Typography component="h3" variant="h5" mt={2}>
        {message}
      </Typography>
      <Typography component="h4" variant="h6" mt={2} textAlign="center">
        {destination}
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ height: 80, width: 200, borderRadius: 10 }}
          onClick={() => history.push(path)}
        >
          {props.hasCurrentTrip ? "Trip Log" : "Get Started"}
        </Button>
      </Box>
    </Box>
  );
}
