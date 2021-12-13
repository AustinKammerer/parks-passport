import { useDispatch } from "react-redux";
import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function DeleteTripButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  // action differs depending on the button's props from its parent component
  const handleDelete = () => {
    // TripPlanner and TripHistory give it 'trip'
    if (props.trip) {
      const { id } = props.trip;
      dispatch({ type: "DELETE_TRIP", payload: id });
    }
    // TripLog gives it 'tripLog'
    else if (props.tripLog) {
      const { tripId } = props.tripLog;
      dispatch({ type: "DELETE_TRIP", payload: tripId });
      history.push(`/history`);
    }
    // JournalListItem and PhotoItem give it 'entry'
    else if (props.entry) {
      const { logId } = props.entry;
      dispatch({ type: "DELETE_ENTRY", payload: logId });
    }
  };
  // console.log(props.sx);

  return (
    <>
      {props.entry ? (
        <IconButton size="large" color="danger" onClick={handleDelete}>
          {<DeleteForeverIcon />}
        </IconButton>
      ) : (
        <Button
          size={props.trip && "large"}
          color="danger"
          variant="outlined"
          onClick={handleDelete}
          sx={props.sx}
        >
          {props.trip ? <DeleteForeverIcon /> : "Delete Trip Log"}
        </Button>
      )}
    </>
  );
}
