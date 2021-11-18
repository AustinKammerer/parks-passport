import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { AddTripButton } from "../Buttons";

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

  // const { wishlist } = useSelector((store) => store.trip);

  // const isInWishlist = (park) => {
  //   const found = wishlist.find((trip) => trip.parkCode === park.parkCode);
  //   console.log(found);
  //   return found !== undefined;
  // };

  // React.useEffect(() => {
  //   isInWishlist(result);
  // }, []);

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
        <Button size="large" color="success" variant="contained">
          Start
        </Button>
        <AddTripButton park={result} />
      </CardActions>
    </Card>
  );
}
