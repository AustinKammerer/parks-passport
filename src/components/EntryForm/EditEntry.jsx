import React from "react";
import { useDispatch, useSelector } from "react-redux";

import EntryForm from "./EntryForm";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditEntry() {
  const dispatch = useDispatch();

  const { tripLog, editEntry, editEntryDialogOpen } = useSelector(
    (store) => store.log
  );
  const { tripId } = tripLog;

  const handleChange = (e) => {
    // dispatch input to editEntry reducer
    switch (e.target.name) {
      case "text":
        // image and text input data are in different properties on e.target
        dispatch({
          type: "EDIT_ENTRY_ONCHANGE",
          payload: { property: "text", value: e.target.value },
        });
        break;
      // image update not yet implemented
      // need to find a way to check if the user is updating the image to avoid upload redundency
      // case "image":
      //   dispatch({
      //     type: "EDIT_ENTRY_ONCHANGE",
      //     payload: { property: "image", value: e.target.files[0] },
      //   });
      //   break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("editEntry", editEntry);
    // const { logId } = editEntry;
    // const formData = new FormData();
    // // append any tripId first
    // formData.append("tripId", tripId);
    // // then append any text
    // formData.append("text", editEntry.text);
    // // append the actual image
    // formData.append("imageUpload", editEntry.image);
    dispatch({ type: "EDIT_ENTRY", payload: { editEntry, tripId } });
    // dispatch({
    //   type: "EDIT_ENTRY",
    //   payload: { editEntry, history },
    // });
  };

  const handleDialogClose = () => {
    dispatch({ type: "CLOSE_EDIT_ENTRY_DIALOG" });
  };

  return (
    <Dialog open={editEntryDialogOpen} onClose={handleDialogClose} fullWidth>
      <DialogTitle>Edit Log Entry</DialogTitle>
      <DialogContent>
        <EntryForm
          handleChange={handleChange}
          mode={"edit"}
          tripId={tripId}
          inputValue={editEntry.text}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
