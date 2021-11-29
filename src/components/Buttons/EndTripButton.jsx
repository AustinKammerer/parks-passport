import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";

export default function EndTripButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const tripId = props.tripId;

  const handleEnd = () => {
    dispatch({ type: "END_TRIP", payload: { tripId, history } });
  };

  return (
    <Button
      size="large"
      color="danger"
      variant="outlined"
      sx={props.sx}
      onClick={handleEnd}
    >
      End Trip
    </Button>
  );
}
