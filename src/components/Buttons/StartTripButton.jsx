import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";

export default function StartTripButton(props) {
  const dispatch = useDispatch();

  const { currentLog } = useSelector((store) => store.trip);

  // local state for whether or not the park is found in the user's wishlist
  const [isFound, setIsFound] = React.useState(false);

  // const [clicked, setClicked] = React.useState(false);

  const isCurrentLog = (park) => {
    // the button has access to the component's park search result via prop
    // this function checks if that park is present in the user's wishlist
    console.log("checking currentLog");
    const found = currentLog.find((trip) => trip.parkCode === park.parkCode);
    found !== undefined && setIsFound(true);
  };

  React.useEffect(() => {
    props.trip && isCurrentLog(props.park);
    props.result && isCurrentLog(props.result);
  }, [currentLog]);

  const handleStart = () => {
    // determine in which view the Start button was selected
    // from ParkFinder:
    if (props.result) {
      const { parkCode, name } = props.result;
      const imagePath = props.result.images[0].url;
      // send the park to the saga to insert to database
      // dispatch({ type: "ADD_TRIP", payload: { parkCode, imagePath, name } });
      console.log("clicked in Finder");
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
      disabled={isFound}
    >
      {isFound ? "Started" : "Start"}
    </Button>
  );
}
