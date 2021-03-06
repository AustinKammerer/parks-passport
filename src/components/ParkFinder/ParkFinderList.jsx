import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ParkFinderListItem from "./ParkFinderListItem";

import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function ParkFinderList() {
  const dispatch = useDispatch();
  const { searchResults, filterSwitch } = useSelector((store) => store.park);

  const [results, setResults] = React.useState(searchResults);

  React.useEffect(() => setResults(searchResults), [searchResults]);

  // handle switch toggle
  const handleSwitch = (e) => {
    dispatch({ type: "TOGGLE_SWITCH", payload: e.target.checked });
    switch (e.target.checked) {
      case true:
        const filteredResults = searchResults.filter(
          (result) =>
            result.designation === "National Park" ||
            result.designation === "National Parks" ||
            result.designation === "National Park & Preserve" ||
            result.designation === "National Park and Preserve" ||
            result.designation === "National and State Parks"
        );
        setResults(filteredResults);
        break;
      case false:
        setResults(searchResults);
        break;
      default:
        setResults(searchResults);
        break;
    }
  };

  return (
    <Grid
      // display="flex"
      container
      spacing={2}
      justifyContent="center"
      mt={0}
    >
      {searchResults.length ? (
        <Grid item mt={-2}>
          <FormControl>
            <FormControlLabel
              control={
                <Switch checked={filterSwitch} onChange={handleSwitch} />
              }
              label="National Parks only"
            />
          </FormControl>
        </Grid>
      ) : (
        ""
      )}

      {results.map((result) => (
        <Grid item key={result.parkCode}>
          <ParkFinderListItem result={result} />
        </Grid>
      ))}
    </Grid>
  );
}
