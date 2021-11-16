import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

export default function ParkFinderListItem({ result }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const getParkInfo = () => {
    console.log(result.parkCode);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={getParkInfo}>
        <CardMedia
          component="img"
          width="345"
          image={result.images[0].url}
          alt={result.fullName}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {result.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button size="large" color="primary" variant="contained">
          Add
        </Button>
        <Button size="large" color="success" variant="contained">
          Start
        </Button>
      </CardActions>
    </Card>
  );
}
