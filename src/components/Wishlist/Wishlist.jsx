import React from "react";
import { useSelector, useDispatch } from "react-redux";

import WishlistItem from "../WishlistItem/WishlistItem";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function Wishlist() {
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch({ type: "FETCH_TRIP_LISTS" });
  // }, []);

  const { wishlist } = useSelector((store) => store.trip);

  return (
    <Container component="main">
      <Typography component="h1" variant="h3">
        Wishlist
      </Typography>
      <Grid container spacing={2} justifyContent="center" mt={0}>
        {wishlist.map((trip) => (
          <Grid item key={trip.parkCode}>
            <WishlistItem trip={trip} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
