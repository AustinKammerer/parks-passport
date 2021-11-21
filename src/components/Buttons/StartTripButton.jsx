import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";

export default function StartTripButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentTrip } = useSelector((store) => store.trip);

  // local state for whether or not the park is found in the user's tripPlanner
  const [isFound, setIsFound] = React.useState(false);

  // const [clicked, setClicked] = React.useState(false);

  const isCurrentTrip = (park) => {
    // the button has access to the component's park search result via prop
    // this function checks if that park is present in the user's tripPlanner
    console.log("checking currentTrip");
    const found = currentTrip.find((trip) => trip.parkCode === park.parkCode);
    found !== undefined && setIsFound(true);
  };

  React.useEffect(() => {
    // props.trip && isCurrentTrip(props.trip);
    props.result && isCurrentTrip(props.result);
  }, [currentTrip]);

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
    // from tripPlanner
    else if (props.trip) {
      // get the trip's id for the PUT request
      const { id } = props.trip;
      // dispatch the action to a saga with the id
      dispatch({ type: "START_TRIP", payload: id });
      history.push("/user");
      console.log("clicked in planner");
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
      {isFound ? "In Progress" : "Start"}
    </Button>
  );
}
