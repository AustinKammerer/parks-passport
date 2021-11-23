import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

export default function ImageUploadForm() {
  return (
    <Container component="main">
      <Box
        component="form"
        enctype="multipart/form-data"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <input
          type="file"
          onChange={handleSelection}
          accept="image/*"
          name="file"
        />

        <TextField
          value={newItem.description}
          onChange={handleChange}
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          size="small"
        />
        <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>
          Add Image
        </Button>
      </Box>
    </Container>
  );
}
