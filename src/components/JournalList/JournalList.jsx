import { useSelector } from "react-redux";

import JournalListItem from "../JournalListItem/JournalListItem";

// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function JournalList({ tripLog }) {
  // const { tripLog } = useSelector((store) => store.log);

  return (
    <Grid container flexDirection="column" spacing={2} justifyContent="center">
      {tripLog.entries?.map((entry) => (
        <Grid item key={entry.logId}>
          <JournalListItem entry={entry} />
        </Grid>
      ))}
    </Grid>
  );
}
