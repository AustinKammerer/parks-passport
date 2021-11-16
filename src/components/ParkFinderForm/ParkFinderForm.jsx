import React from "react";
import { useDispatch } from "react-redux";
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

export default function ParkFinderForm() {
  const dispatch = useDispatch();

  const [state, setState] = React.useState("");

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const handleSearch = () => {
    console.log(state);
    dispatch({ type: "FETCH_SEARCH_RESULTS", payload: state });
  };
  return (
    <Box>
      <FormControl fullWidth variant="standard" margin="normal">
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
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}
