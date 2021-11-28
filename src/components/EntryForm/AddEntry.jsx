import React from "react";
import useQuery from "../../hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import EntryForm from "./EntryForm";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddEntry() {
  const dispatch = useDispatch();

  const { tripLog, newEntry, newEntryDialogOpen } = useSelector(
    (store) => store.log
  );
  const { tripId } = tripLog;

  const handleChange = (e) => {
    // dispatch input to newEntry reducer
    switch (e.target.name) {
      // image and text input data are in different properties on e.target
      case "text":
        dispatch({
          type: "NEW_ENTRY_ONCHANGE",
          payload: { property: "text", value: e.target.value },
        });
        break;
      case "image":
        dispatch({
          type: "NEW_ENTRY_ONCHANGE",
          payload: { property: "image", value: e.target.files[0] },
        });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // append tripId first
    formData.append("tripId", tripId);
    // then append any text
    formData.append("text", newEntry.text);
    // append the actual image
    formData.append("imageUpload", newEntry.image);
    // dispatch to saga
    dispatch({ type: "ADD_ENTRY", payload: { formData, tripId } });
  };

  const handleDialogClose = () => {
    dispatch({ type: "CLOSE_NEW_ENTRY_DIALOG" });
  };

  return (
    <Container component="main">
      <Dialog open={newEntryDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>New Log Entry</DialogTitle>
        <DialogContent>
          <EntryForm handleChange={handleChange} mode={"add"} tripId={tripId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
