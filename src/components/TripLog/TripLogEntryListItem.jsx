import { DeleteButton, EditButton } from "../Buttons";

// import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function JournalListItem({ entry }) {
  const imagePath = `/api/log/entry/uploads/${entry.imagePath}`; // images are optional
  return (
    <Paper sx={{ maxWidth: 360, mx: "auto" }}>
      <Grid container justifyContent="space-between">
        {entry.imagePath && (
          <Grid item xs={12}>
            <img
              src={imagePath}
              style={{ height: "100%", width: "100%", objecFit: "contain" }}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography>{entry.text}</Typography>
        </Grid>
        <Grid item xs={9} alignSelf="end">
          <Typography>{entry.time}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Stack direction="row">
            <EditButton entry={entry} />
            <DeleteButton variant="text" entry={entry} />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
    // <Card sx={{ maxWidth: 345 }}>
    //   {entry.imagePath &&
    //   <CardMedia
    //     component="img"
    //     height="140"
    //     image={imagePath}
    //   />}
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       Lizard
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       Lizards are a widespread group of squamate reptiles, with over 6,000
    //       species, ranging across all continents except Antarctica
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Share</Button>
    //     <Button size="small">Learn More</Button>
    //   </CardActions>
    // </Card>
  );
}
