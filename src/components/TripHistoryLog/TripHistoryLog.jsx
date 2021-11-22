import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import JournalList from "../JournalList/JournalList";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

export default function TripHistoryLog() {
  const dispatch = useDispatch();
  const { tripId } = useParams();

  const { tripLog } = useSelector((store) => store.trip);
  const { tripHistory } = useSelector((store) => store.trip);

  useEffect(
    () => dispatch({ type: "FETCH_TRIP_LISTS", payload: tripId }),
    [dispatch]
  );
  useEffect(
    () => dispatch({ type: "FETCH_TRIP_LOG", payload: tripId }),
    [tripHistory]
  );

  const thisTrip = tripHistory?.find((trip) => trip.id === tripId);

  // directs user to the park's info page - uses route params
  const getParkInfo = () => {
    console.log(currentTrip[0].parkCode);
    history.push(`/info/${currentTrip[0].parkCode}`);
  };

  console.log("thisTrip:", thisTrip);

  return (
    <Container component="main">
      <Box>
        <img src={thisTrip?.imagePath} />
        <Typography component="h2" variant="h4">
          {thisTrip?.name}
        </Typography>
        <Button onClick={getParkInfo}>Info</Button>
        <Button variant="contained" color="secondary">
          Photos
        </Button>
        <Button
          variant="contained"
          onClick={() => history.push(`/journal/new/${tripId}`)}
        >
          Add Note
        </Button>
        <JournalList tripLog={tripLog} />
      </Box>
    </Container>
  );
}
