import { useDispatch } from "react-redux";
import React from "react";

import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function DeleteTripButton(props) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (props.trip) {
      const { id } = props.trip;
      dispatch({ type: "DELETE_TRIP", payload: id });
    } else if (props.log) {
      const { id } = props.log;
      dispatch({ type: "DELETE_LOG", payload: id });
    }
  };

  return (
    <Button
      size="large"
      color="error"
      variant={props.trip && "contained"}
      onClick={handleDelete}
    >
      {<DeleteForeverIcon />}
    </Button>
  );
}