import { DeleteButton } from "../Buttons/";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function JournalLogItem({ log }) {
  return (
    <Paper>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography>{log.text}</Typography>
        </Grid>
        <Grid item>
          <Button>{<EditIcon />}</Button>
          <DeleteButton variant="text" log={log} />
        </Grid>
      </Grid>
    </Paper>
  );
}
