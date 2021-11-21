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

  const { tripLog } = useSelector((store) => store.log);

  const logToEdit = tripLog?.filter((log) => log.id === logId)[0];

  const { journalInput } = useSelector((store) => store.log);

  React.useEffect(() => {
    dispatch({ type: "SET_JOURNAL_INPUT", payload: logToEdit.text });
  }, []);

  const handleChange = (e) => {
    dispatch({ type: "SET_JOURNAL_INPUT", payload: e.target.value });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(tripLog);
    dispatch({
      type: "EDIT_ENTRY",
      payload: { tripId, logId: logToEdit.id, journalInput, history },
    });
  };
  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        Edit your journal note
      </Typography>
      <Box component="form" onSubmit={handleEdit}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button onClick={() => history.push(`/current?tripId=${tripId}`)}>
          Cancel
        </Button>
        <FormControl fullWidth margin="normal">
          <TextField
            id="journal-edit"
            multiline
            rows={6}
            value={journalInput}
            onChange={handleChange}
          />
        </FormControl>
      </Box>
    </Container>
  );
}
