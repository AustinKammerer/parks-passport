import { useHistory } from "react-router-dom";
import { DeleteButton } from "../Buttons";

import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

export default function TripHistoryListItem({ trip }) {
  const history = useHistory();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => history.push(`/log/${trip.id}`)}>
        <CardMedia
          component="img"
          width="345"
          image={trip.imagePath}
          alt={trip.parkCode}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {trip.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <DeleteButton trip={trip} />
      </CardActions>
    </Card>
  );
}
