import React from "react";
import useQuery from "../../hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";

export default function EntryForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  // custom hook to parse the hash router query string
  const query = useQuery();

  // get properties from the query string
  const tripId = query.get("tripId");
  const logId = query.get("logId");
  const type = query.get("type");
  const mode = query.get("mode");

  console.log("logId", query.get("logId"));
  console.log("tripId", query.get("tripId"));
  console.log("type", query.get("type"));
  console.log("mode", query.get("mode"));

  const { tripLog, newEntry, editEntry } = useSelector((store) => store.log);

  // const entryToEdit = tripLog.entries?.find((entry) => entry.logId === logId);

  // const { journalInput } = useSelector((store) => store.log);
  // dispatch to a saga depending on mode
  mode === "new" &&
    React.useEffect(() => {
      // get the trip's log (for true tripId)
      dispatch({ type: "FETCH_TRIP_LOG", payload: tripId });
    }, []);

  mode === "edit" &&
    React.useEffect(() => {
      // get the individual entry being edited (from 'log' table)
      dispatch({ type: "FETCH_ENTRY_TO_EDIT", payload: logId });
    }, []);

  const handleChange = (e) => {
    switch (mode) {
      // dispatch to the appropriate reducer depending on mode
      case "new":
        dispatch({
          type: "NEW_NOTE_ONCHANGE",
          payload: { property: e.target.name, value: e.target.value },
        });
        break;
      case "edit":
        dispatch({
          type: "EDIT_ONCHANGE",
          payload: { property: e.target.name, value: e.target.value },
        });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (mode) {
      case "new":
        console.log("new mode", newEntry);
        dispatch({
          type: "ADD_ENTRY",
          payload: { newEntry, history, type, tripId },
        });
        break;
      case "edit":
        console.log("edit mode", editEntry);
        dispatch({
          type: "EDIT_ENTRY",
          payload: { editEntry, history },
        });
        break;
    }
  };

  let action;
  if (mode === "new") {
    action = "New";
  } else if (mode === "edit") {
    action = "Edit";
  }

  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        {action} log entry
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button onClick={() => history.push(`/log/main/${editEntry.tripId}`)}>
          Cancel
        </Button>
        <FormControl fullWidth margin="normal">
          <TextField
            id="journal-edit"
            multiline
            rows={6}
            name="text"
            value={editEntry.text}
            onChange={handleChange}
          />
        </FormControl>
      </Box>
    </Container>
  );
}
