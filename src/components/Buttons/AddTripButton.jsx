import { useDispatch, useSelector } from "react-redux";
import React from "react";

import Button from "@mui/material/Button";

export default function AddTripButton({ park }) {
  const dispatch = useDispatch();

  const { wishlist } = useSelector((store) => store.trip);

  // local state for whether or not the park is found in the user's wishlist
  const [isFound, setIsFound] = React.useState(false);

  const isInWishlist = (park) => {
    // the button has access to individaul parks via a prop that its parent component passes
    // this function checks if that park is present in the user's wishlist
    const found = wishlist.find((trip) => trip.parkCode === park.parkCode);
    found !== undefined && setIsFound(true);
  };

  React.useEffect(() => {
    isInWishlist(park);
  }, []);

  const handleAdd = () => {
    const { parkCode, name, states } = park;
    const imagePath = park.images[0].url;
    // send the park to the saga to insert to database
    dispatch({
      type: "ADD_TRIP",
      payload: { parkCode, imagePath, name, states },
    });
  };

  return (
    <Button
      size="large"
      color="primary"
      variant="contained"
      onClick={handleAdd}
      disabled={isFound}
    >
      {isFound ? "In Wishlist" : "Add"}
    </Button>
  );
}
