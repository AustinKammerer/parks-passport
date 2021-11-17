import React from "react";
import { useSelector, useDispatch } from "react-redux";

import WishlistItem from "../WishlistItem/WishlistItem";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function Wishlist() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "FETCH_WISHLIST" });
  }, []);

  const { wishlist } = useSelector((store) => store.park);

  return (
    <Container component="main">
      <Typography component="h1" variant="h3">
        Wishlist
      </Typography>
      {wishlist.map((trip) => (
        <Grid item key={trip.parkCode}>
          <WishlistItem trip={trip} />
        </Grid>
      ))}
    </Container>
  );
}
