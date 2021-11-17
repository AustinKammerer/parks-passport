import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
    history.push(`/info/${result.parkCode}`);
  };

  const handleAdd = () => {
    const { parkCode } = result;
    const imagePath = result.images[0].url;
    console.log(parkCode);
    console.log(imagePath);
    dispatch({ type: "ADD_TRIP", payload: { parkCode, imagePath } });
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
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          size="large"
          color="primary"
          variant="contained"
          onClick={handleAdd}
        >
          Add
        </Button>
        <Button size="large" color="success" variant="contained">
          Start
        </Button>
      </CardActions>
    </Card>
  );
}
