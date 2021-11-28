import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";

export default function EndTripButton({ tripId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEnd = () => {
    dispatch({ type: "END_TRIP", payload: { tripId, history } });
  };

  return (
    <Button size="large" color="error" variant="contained" onClick={handleEnd}>
      End Trip
    </Button>
  );
}
