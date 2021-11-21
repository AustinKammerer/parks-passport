import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";

export default function NoteForm() {
  const { tripId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { journalInput } = useSelector((store) => store.log);

  const handleChange = (e) => {
    dispatch({ type: "SET_JOURNAL_INPUT", payload: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_ENTRY",
      payload: { tripId, journalInput, history },
    });
  };
  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        Add a journal note
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button onClick={() => history.push("/current")}>Cancel</Button>
        <FormControl fullWidth margin="normal">
          <TextField
            id="journal-form"
            label="Journal"
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
