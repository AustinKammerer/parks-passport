import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import JournalList from "../JournalList/JournalList";

export default function CurrentTrip() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentTrip } = useSelector((store) => store.trip);

  React.useEffect(() => {
    dispatch({ type: "FETCH_TRIP_LOG", payload: currentTrip[0].id });
  }, []);

  const getParkInfo = () => {
    console.log(currentTrip[0].parkCode);
    history.push(`/info/${currentTrip[0].parkCode}`);
  };
  return (
    <Box>
      {/* <Typography variant="body2">{JSON.stringify(currentTrip)}</Typography> */}
      <img src={currentTrip[0].imagePath} />
      <EndTripButton trip={currentTrip[0]} />
      <Button onClick={getParkInfo}>Info</Button>
      <Button variant="contained" color="secondary">
        Photos
      </Button>
      <Button
        variant="contained"
        onClick={() => history.push(`/journal/new/${currentTrip[0].id}`)}
      >
        Add Note
      </Button>
      <JournalList />
    </Box>
  );
}
