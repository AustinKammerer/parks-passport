import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { connect } from "react-redux";
// import useForceUpdate from "../../hooks/useForceUpdate";
import App from "../App/App";
import Button from "@mui/material/Button";

// function useForceUpdate() {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue((value) => value + 1); // update the state to force render
// }

export default function AddTripButton({ park }) {
  const dispatch = useDispatch();
  // const forceUpdate = useForceUpdate();

  const { wishlist } = useSelector((store) => store.trip);

  // local state for whether or not the park is found in the user's wishlist
  const [isFound, setIsFound] = React.useState(false);

  // const [clicked, setClicked] = React.useState(false);

  const isInWishlist = (park) => {
    // the button has access to the component's park search result via prop
    // this function checks if that park is present in the user's wishlist
    console.log("checking wishlist");
    const found = wishlist.find((trip) => trip.parkCode === park.parkCode);
    found !== undefined && setIsFound(true);
  };

  React.useEffect(() => {
    isInWishlist(park);
  }, [wishlist]);

  const handleAdd = async function () {
    const { parkCode, name, states } = park;
    const imagePath = park.images[0].url;
    // send the park to the saga to insert to database
    dispatch({
      type: "ADD_TRIP",
      payload: { parkCode, imagePath, name, states },
    });
    // setClicked(true);
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
