import { useSelector } from "react-redux";

import ParkFinderListItem from "../ParkFinderListItem/ParkFinderListItem";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function ParkFinderList() {
  const results = useSelector((store) => store.park.searchResults);
  console.log(results);
  return (
    <Grid
      // display="flex"
      container
      spacing={2}
      justifyContent="center"
      mt={0}
    >
      {results.map((result) => (
        <Grid item key={result.parkCode}>
          <ParkFinderListItem result={result} />
        </Grid>
      ))}
    </Grid>
  );
}