import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function JournalLogItem({ log }) {
  return (
    <Paper>
      <Typography>{log.text}</Typography>
    </Paper>
  );
}
