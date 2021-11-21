import { DeleteButton, EditButton } from "../Buttons";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

export default function JournalLogItem({ entry }) {
  return (
    <Paper>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography>{entry.text}</Typography>
        </Grid>
        <Grid item>
          <EditButton entry={entry} />
          <DeleteButton variant="text" entry={entry} />
        </Grid>
      </Grid>
    </Paper>
  );
}
