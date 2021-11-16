import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

  // const [state, setState] = React.useState("");

  // searchTerm (a US state) will be stored in redux
  const searchTerm = useSelector((store) => store.park.searchTerm);

  const handleChange = (e) => {
    // setState(e.target.value);
    // dispatch the input's value to redux
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  const handleSearch = () => {
    // dispatch the searchTerm to Saga that queries the NPS API
    dispatch({ type: "FETCH_SEARCH_RESULTS", payload: searchTerm });
  };

  return (
    <Box>
      <FormControl fullWidth variant="standard" margin="normal">
        <InputLabel id="state-select-label">State/Territory</InputLabel>
        <Select
          labelId="state-select-label"
          id="state-select"
          value={searchTerm}
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
      <Button variant="contained" onClick={handleSearch} color="info">
        Search
      </Button>
    </Box>
  );
}
