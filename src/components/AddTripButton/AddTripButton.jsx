import { useDispatch, useSelector } from "react-redux";
import React from "react";

import Button from "@mui/material/Button";

export default function AddTripButton({ park, isInWishlist }) {
  const dispatch = useDispatch();

  // const { wishlist } = useSelector((store) => store.trip);

  // const isInWishlist = (park) => {
  //   const found = wishlist.find((trip) => trip.parkCode === park.parkCode);
  //   console.log(found);
  //   return found !== undefined;
  // };

  // React.useEffect(() => {
  //   isInWishlist(park);
  // }, []);

  const handleAdd = () => {
    const { parkCode, name } = park;
    const imagePath = park.images[0].url;
    // send the park to the saga to insert to database
    dispatch({ type: "ADD_TRIP", payload: { parkCode, imagePath, name } });
  };

  return (
    <Button
      size="large"
      color="primary"
      variant="contained"
      onClick={handleAdd}
    >
      {isInWishlist ? "In Wishlist" : "Add"}
    </Button>
  );
}
