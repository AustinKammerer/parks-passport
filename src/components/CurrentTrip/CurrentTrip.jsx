import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useQuery from "../../hooks/useQuery";

import { EndTripButton } from "../Buttons";
import JournalList from "../JournalList/JournalList";
import GetStarted from "../GetStarted/GetStarted";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export default function CurrentTrip() {
  const dispatch = useDispatch();
  const history = useHistory();
  // custom hook to parse the hash router query string
  const query = useQuery();
  // if tripId is "null", the GetStarted component will render
  const tripId = query.get("tripId");

  const { currentTrip } = useSelector((store) => store.trip);

  React.useEffect(() => {
    dispatch({ type: "FETCH_TRIP_LISTS" });
    // clear the entry form inputs
    dispatch({ type: "CLEAR_JOURNAL_INPUT" });
  }, []);

  React.useEffect(() => {
    // get the trip's log after the trip is fetched
    currentTrip.length &&
      dispatch({ type: "FETCH_TRIP_LOG", payload: currentTrip[0].id });
  }, [currentTrip]);

  // directs user to the park's info page - uses route params
  const getParkInfo = () => {
    console.log(currentTrip[0].parkCode);
    history.push(`/info/${currentTrip[0].parkCode}`);
  };
  return (
    <Container component="main">
      {tripId !== "null" ? (
        <Box>
          <img src={currentTrip[0]?.imagePath} />
          <Typography component="h2" variant="h4">
            {currentTrip[0]?.name}
          </Typography>
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
      ) : (
        <GetStarted />
      )}
    </Container>
  );
}
