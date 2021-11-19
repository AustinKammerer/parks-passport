import { useDispatch } from "react-redux";
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

  return (
    <Container component="main">
      <Typography component="h1" variant="h5">
        Add a journal note
      </Typography>
      <Box component="form">
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button onClick={() => history.goBack()}>Back</Button>
        <FormControl fullWidth margin="normal">
          <TextField id="journal-form" label="Journal" multiline rows={6} />
        </FormControl>
      </Box>
    </Container>
  );
}
