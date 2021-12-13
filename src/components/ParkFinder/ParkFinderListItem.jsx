import React from "react";
import { useHistory } from "react-router-dom";

import { AddTripButton, StartTripButton } from "../Buttons";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

export default function ParkFinderListItem({ result }) {
  const history = useHistory();

  const getParkInfo = () => {
    history.push(`/info/${result.parkCode}`);
  };

  return (
    <Card
      sx={{ maxWidth: 345, mx: "auto", backgroundColor: "#ededed" }}
      elevation={3}
    >
      <CardActionArea onClick={getParkInfo}>
        <CardMedia
          component="img"
          width="345"
          image={result.images[0].url}
          alt={result.fullName}
        />
        <CardContent sx={{ p: 1 }}>
          <Typography variant="h5" component="div">
            {result.fullName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
        <StartTripButton result={result} />
        {/* <Button
          size="large"
          color="primary"
          variant="contained"
          onClick={handleAdd}
          disabled={isFound}
        >
          {isFound ? "In Wishlist" : "Add"}
        </Button> */}
        <AddTripButton park={result} />
      </CardActions>
    </Card>
  );
}
