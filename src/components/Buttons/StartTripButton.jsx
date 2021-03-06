import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function StartTripButton(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentTrip } = useSelector((store) => store.trip);

  // local state for whether or not the park is found in the user's tripPlanner
  const [isFound, setIsFound] = React.useState(false);

  // local state for opening the dialogue
  const [open, setOpen] = React.useState(false);

  // check if the parent component represents the park that is the current trip
  const isCurrentTrip = (park) => {
    // the button has access to the component's park search result via prop
    // this function checks if that park is present in the user's tripPlanner
    const found = currentTrip.find((trip) => trip.parkCode === park.parkCode);
    found !== undefined && setIsFound(true);
  };

  React.useEffect(() => {
    // run the checker if the parent component is a search result
    // the parent will send 'result' as a prop
    props.result && isCurrentTrip(props.result);
  }, [currentTrip]);

  const handleStart = () => {
    // determine behavior by checking the props passed to the button
    // from ParkFinder (parent passes 'result'):
    if (props.result) {
      if (currentTrip?.length === 0) {
        // if there is no current trip, add a new trip and activate it
        const { parkCode, name, states } = props.result;
        const imagePath = props.result.images[0].url;
        // send the park to the saga to insert to database with is_current = TRUE
        dispatch({
          type: "ADD_TRIP",
          payload: {
            parkCode,
            imagePath,
            name,
            states,
            isCurrent: true,
            history,
          },
        });
      } else if (currentTrip?.length > 0) {
        // otherwise open a dialogue saying only one trip may be active
        setOpen(true);
      }
    }
    // from tripPlanner (parent passes 'trip')
    else if (props.trip) {
      if (currentTrip?.length === 0) {
        // get the trip's id for the PUT request to activate the trip
        const { id } = props.trip;
        // dispatch the action to a saga with the id
        dispatch({ type: "START_TRIP", payload: { tripId: id, history } });
      } else if (currentTrip?.length > 0) {
        // otherwise open a dialogue saying only one trip may be active
        setOpen(true);
      }
    }
  };

  return (
    <>
      <Button
        color="success"
        variant="contained"
        onClick={handleStart}
        disabled={isFound}
      >
        {isFound ? "In Progress" : "Start"}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          {"You already have an active trip!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You may only have one active trip at a time. Visit your Current Trip
            and end it to start another trip. Would you like to go there now?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="danger"
            onClick={() => setOpen(false)}
          >
            No, Thanks
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => history.push(`/current/log/${currentTrip[0].id}`)}
          >
            Yes, Please
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
