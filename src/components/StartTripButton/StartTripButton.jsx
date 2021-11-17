import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";

export default function StartTripButton(props) {
  const dispatch = useDispatch();

  const handleStart = () => {
    // determine in which view the Start button was selected
    // from ParkInfo:
    if (props.parkInfo) {
      const { parkCode, name } = props.parkInfo;
      const imagePath = props.parkInfo.images[0].url;
      // send the park to the saga to insert to database
      // dispatch({ type: "ADD_TRIP", payload: { parkCode, imagePath, name } });
      console.log("clicked in Info");
    }
    // from Wishlist
    else if (props.trip) {
      // get the trip's id for the PUT request
      const { id } = props.trip;
      // dispatch the action to a saga with the id
      dispatch({ type: "START_TRIP", payload: id });
      console.log("clicked in wishlist");
    }
  };

  return (
    <Button
      size="large"
      color="success"
      variant="contained"
      onClick={handleStart}
    >
      Start
    </Button>
  );
}
