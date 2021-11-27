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

export default function AddEntry({ open, setOpen }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // custom hook to parse the hash router query string
  const query = useQuery();

  // get properties from the query string
  // const tripId = query.get("tripId");
  // const logId = query.get("logId");
  // const mode = query.get("mode");

  // console.log("logId", query.get("logId"));
  // console.log("tripId", query.get("tripId"));
  // console.log("type", query.get("type"));

  const { tripLog, newEntry, newEntryDialogOpen } = useSelector(
    (store) => store.log
  );
  const { tripId } = tripLog;

  // React.useEffect(() => {
  //   // get the trip's log (for true tripId)
  //   dispatch({ type: "FETCH_TRIP_LOG", payload: tripId });
  // }, []);

  const handleChange = (e) => {
    // dispatch input to newEntry reducer
    switch (e.target.name) {
      case "text":
        dispatch({
          type: "NEW_TEXT_ONCHANGE",
          payload: { property: "text", value: e.target.value },
        });
        break;
      case "image":
        dispatch({
          type: "NEW_IMAGE_ONCHANGE",
          payload: { property: "image", value: e.target.files[0] },
        });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // append any tripId first
    formData.append("tripId", tripLog.tripId);
    // then append any text
    formData.append("text", newEntry.text);
    // append the actual image
    formData.append("imageUpload", newEntry.image);
    dispatch({ type: "ADD_ENTRY", payload: { formData, tripId, history } });

    // console.log("newEntry", newEntry);
    // dispatch({
    //   type: "ADD_ENTRY",
    //   payload: { newEntry, history, tripId },
    // });
  };

  const handleDialogClose = () => {
    dispatch({ type: "CLOSE_NEW_ENTRY_DIALOG" });
  };

  return (
    <Container component="main">
      {/* <Box component="form" onSubmit={handleSubmit}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button onClick={() => history.push(`/log/main/${tripLog.tripId}`)}>
          Cancel
        </Button>
        <FormControl fullWidth margin="normal">
          <TextField
            id="journal-edit"
            multiline
            rows={6}
            name="text"
            onChange={handleChange}
          />
        </FormControl>
      </Box> */}
      <Dialog open={newEntryDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>New Log Entry</DialogTitle>
        <DialogContent>
          <EntryForm
            handleChange={handleChange}
            mode={"add"}
            tripId={tripLog.tripId}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
