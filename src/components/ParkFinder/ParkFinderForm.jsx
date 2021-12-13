import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useQuery from "../../hooks/useQuery";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ParkFinderForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const state = query.get("state");

  React.useEffect(() => {
    dispatch({ type: "FETCH_STATES" });
    dispatch({ type: "SET_SEARCH_TERM", payload: state ? state : "" });
  }, []);

  const { searchTerm, parkStates } = useSelector((store) => store.park);

  // handle dropdown selection
  const handleSelect = (e) => {
    history.push(`/finder?state=${e.target.value}`);
    // dispatch the input's value to redux
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  // handle submission
  const handleSearch = () => {
    // history.push(`/finder?state=${searchTerm}`);
    // dispatch the searchTerm to Saga that queries the NPS API
    dispatch({ type: "FETCH_SEARCH_RESULTS", payload: searchTerm });
    // turn the filter switch off
    dispatch({ type: "SET_UNCHECKED" });
  };

  return (
    <Box>
      {parkStates.length && (
        <>
          <FormControl fullWidth variant="standard" margin="normal">
            <InputLabel id="state-select-label">State/Territory</InputLabel>
            <Select
              labelId="state-select-label"
              id="state-select"
              name="state"
              defaultValue=""
              value={searchTerm}
              label="State/Territory"
              onChange={handleSelect}
              sx={{ maxHeight: 400 }}
            >
              {parkStates.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button
              variant="contained"
              onClick={handleSearch}
              color="secondary"
              sx={{ borderRadius: 10 }}
            >
              Search
            </Button>
          </FormControl>
        </>
      )}
    </Box>
  );
}
