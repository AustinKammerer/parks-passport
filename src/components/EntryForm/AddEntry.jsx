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

export default function AddEntry() {
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

  const { tripLog, newEntry } = useSelector((store) => store.log);

  React.useEffect(() => {
    // get the trip's log (for true tripId)
    dispatch({ type: "FETCH_TRIP_LOG", payload: tripId });
  }, []);

  const handleChange = (e) => {
    // dispatch input to newEntry reducer
    switch (e.target.name) {
      case "text":
        dispatch({
          type: "NEW_TEXT_ONCHANGE",
          payload: { property: e.target.name, value: e.target.value },
        });
        break;
      case "image":
        dispatch({
          type: "NEW_IMAGE_ONCHANGE",
          payload: { propertry: e.target.name, value: e.target.files[0] },
        });
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("newEntry", newEntry);
    dispatch({
      type: "ADD_ENTRY",
      payload: { newEntry, history, type, tripId },
    });
  };

  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        New log entry
      </Typography>
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
      <EntryForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        mode={"add"}
        tripId={tripLog.tripId}
      />
    </Container>
  );
}
