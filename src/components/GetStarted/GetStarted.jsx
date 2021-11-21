import React from "react";
// import LogOutButton from "../LogOutButton/LogOutButton";
// import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function GetStarted(props) {
  const history = useHistory();

  // conditionally render the messages as well as button action
  let destination;
  let fragment;
  let path;
  if (props.tripPlannerEmpty) {
    destination = "Finder";
    fragment = "any trips";
    path = "/finder";
  } else if (props.currentTripEmpty && !props.tripPlannerEmpty) {
    destination = "Planner";
    fragment = "an active trip";
    path = "/planner";
  }

  return (
    <Box>
      <Typography component="h3" variant="h5" mt={2}>
        It doesn't look like you have {fragment} yet...
      </Typography>
      <Typography component="h4" variant="h6" mt={2} textAlign="center">
        Use the Park {destination} to get started!
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 80, width: 200 }}
          onClick={() => history.push(path)}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
}
