import React from "react";
import axios from "axios";
import states from "../../modules/states";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ParkFinder() {
  const [state, setState] = React.useState("");

  const handleChange = (event) => {
    setState(event.target.value);
  };
  console.log(state);

  return (
    <>
      <Typography component="h1" variant="h3">
        Park Finder
      </Typography>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="state-select-label">State/Territory</InputLabel>
          <Select
            labelId="state-select-label"
            id="state-select"
            value={state}
            label="State/Territory"
            onChange={handleChange}
          >
            {states.map((state) => (
              <MenuItem key={state.code} value={state.code}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
