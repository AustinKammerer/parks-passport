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

export default function EditEntry() {
  const dispatch = useDispatch();
  const history = useHistory();
  // custom hook to parse the hash router query string
  const query = useQuery();

  // get properties from the query string
  const tripId = query.get("tripId");
  const logId = Number(query.get("logId"));

  console.log(query.get("logId"));
  console.log(query.get("type"));

  const { tripLog, editEntry } = useSelector((store) => store.log);

  // const entryToEdit = tripLog.entries?.find((entry) => entry.logId === logId);

  // const { journalInput } = useSelector((store) => store.log);

  React.useEffect(() => {
    dispatch({ type: "FETCH_ENTRY_TO_EDIT", payload: logId });
  }, []);

  const handleChange = (e) => {
    dispatch({
      type: "EDIT_ONCHANGE",
      payload: { property: e.target.name, value: e.target.value },
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(editEntry);
    dispatch({
      type: "EDIT_ENTRY",
      payload: { editEntry, history },
    });
  };
  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        Edit your journal entry
      </Typography>
      <Box component="form" onSubmit={handleEdit}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button onClick={() => history.push(`/log/${editEntry.tripId}`)}>
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
