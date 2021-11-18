import { useDispatch, useSelector } from "react-redux";
import React from "react";

import Button from "@mui/material/Button";

export default function EndTripButton({ trip }) {
  const dispatch = useDispatch();

  const handleEnd = () => {
    const { id } = trip;
    dispatch({ type: "END_TRIP", payload: id });
  };

  return (
    <Button size="large" color="error" variant="contained" onClick={handleEnd}>
      End Trip
    </Button>
  );
}
