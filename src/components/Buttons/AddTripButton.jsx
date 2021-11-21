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

  const { tripPlanner, currentTrip } = useSelector((store) => store.trip);

  // local state for whether or not the park is found in the user's planner
  const [isFoundPlanner, setIsFoundPlanner] = React.useState(false);
  // local state for whether or not the park is the user's currentTrip
  const [isFoundCurrentTrip, setIsFoundCurrentTrip] = React.useState(false);

  // const [clicked, setClicked] = React.useState(false);

  const isInPlanner = (park) => {
    // the button has access to the component's park search result via prop
    // this function checks if that park is present in the user's planner
    console.log("checking planner");
    const found = tripPlanner.find((trip) => trip.parkCode === park.parkCode);
    found !== undefined && setIsFoundPlanner(true);
  };

  const isCurrentTrip = (park) => {
    // the button has access to the component's park search result via prop
    // this function checks if that park is the user's currentTrip
    console.log("checking currentTrip");
    const found = currentTrip.find((trip) => trip.parkCode === park.parkCode);
    found !== undefined && setIsFoundCurrentTrip(true);
  };

  React.useEffect(() => {
    isInPlanner(park);
  }, [tripPlanner]);

  React.useEffect(() => {
    isCurrentTrip(park);
  }, [currentTrip]);

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
      disabled={isFoundPlanner || isFoundCurrentTrip}
    >
      {isFoundPlanner
        ? "In Planner"
        : isFoundCurrentTrip
        ? "In Progress"
        : "Add"}
    </Button>
  );
}
