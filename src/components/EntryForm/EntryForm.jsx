import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

export default function EntryForm(props) {
  const { handleChange, handleSubmit, tripId, mode, inputValue, fileName } =
    props;
  const { newEntry } = useSelector((store) => store.log);
  // const history = useHistory();
  return (
    <Box component="form" onSubmit={handleSubmit}>
      {mode === "add" && (
        <label htmlFor="contained-upload-button">
          <Input
            id="contained-upload-button"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          <Button variant="contained" component="span">
            Upload
          </Button>
          <Typography variant="body2" mt={1}>
            {newEntry.image ? newEntry.image.name : ""}
          </Typography>
        </label>
      )}

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
