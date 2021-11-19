import { useSelector } from "react-redux";

import JournalLogItem from "../JournalLogItem/JournalLogItem";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function JournalList() {
  const { tripLogs } = useSelector((store) => store.log);

  return (
    <Grid container flexDirection="column" spacing={2} justifyContent="center">
      {tripLogs?.map((log) => (
        <Grid item key={log.id}>
          <JournalLogItem log={log} />
        </Grid>
      ))}
    </Grid>
  );
}
