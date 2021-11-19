import { useDispatch } from "react-redux";
import React from "react";

import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function DeleteTripButton({ trip }) {
  const dispatch = useDispatch();

  const handleEnd = () => {
    const { id } = trip;
    dispatch({ type: "DELETE_TRIP", payload: id });
  };

  return (
    <Button size="large" color="error" variant="contained" onClick={handleEnd}>
      {<DeleteForeverIcon />}
    </Button>
  );
}
