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
  // const [state, setState] = React.useState("");

  // searchTerm (a US state) will be stored in redux
  const { searchTerm, parkStates } = useSelector((store) => store.park);

  const handleChange = (e) => {
    console.dir(e.target);
    history.push(`/finder?state=${e.target.value}`);
    // dispatch the input's value to redux
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  const handleSearch = () => {
    // history.push(`/finder?state=${searchTerm}`);
    // dispatch the searchTerm to Saga that queries the NPS API
    dispatch({ type: "FETCH_SEARCH_RESULTS", payload: searchTerm });
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
              onChange={handleChange}
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
              size="large"
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
