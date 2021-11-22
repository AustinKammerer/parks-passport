import { useDispatch } from "react-redux";
import React from "react";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function DeleteTripButton(props) {
  const dispatch = useDispatch();

  // action differs depending on the button's props from its parent component
  const handleDelete = () => {
    // TripPlanner and TripHistory give it 'trip'
    if (props.trip) {
      const { id } = props.trip;
      dispatch({ type: "DELETE_TRIP", payload: id });
    }
    // JournalListItem and PhotoItem give it 'entry'
    else if (props.entry) {
      const { id, tripId } = props.entry;
      dispatch({ type: "DELETE_ENTRY", payload: { logId: id, tripId } });
    }
  };

  return (
    <>
      {props.entry ? (
        <IconButton size="large" color="error" onClick={handleDelete}>
          {<DeleteForeverIcon />}
        </IconButton>
      ) : (
        <Button
          size="large"
          color="error"
          variant={props.trip && "contained"}
          onClick={handleDelete}
        >
          {<DeleteForeverIcon />}
        </Button>
      )}
    </>
  );
}
