import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

export default function EntryForm(props) {
  const { handleChange, handleSubmit, tripId, mode, inputValue } = props;
  const history = useHistory();
  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* <Button type="submit" variant="contained">
        Submit
      </Button>
      <Button onClick={() => history.push(`/log/main/${tripId}`)}>
        Cancel
      </Button> */}

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />

      <FormControl fullWidth margin="normal">
        <TextField
          id="entry-form"
          label={mode === "add" && "Entry"}
          multiline
          rows={6}
          name="text"
          value={inputValue}
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  );
}
