import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { EndTripButton, DeleteButton } from "../Buttons";
import TripLogEntryListItem from "./TripLogEntryListItem";
import GetStarted from "../GetStarted/GetStarted";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export default function TripLog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();

  const { tripLog } = useSelector((store) => store.log);

  // if the url has a valid trip id, fetch its log
  tripId !== "null" &&
    useEffect(
      () => dispatch({ type: "FETCH_TRIP_LOG", payload: tripId }),
      [dispatch]
    );

  // directs user to the park's info page - uses route params
  const getParkInfo = () => {
    console.log(tripLog.parkCode);
    history.push(`/info/${tripLog.parkCode}`);
  };

  return (
    <Container component="main">
      {/* Display the trip's log */}
      {tripId !== "null" ? (
        <Box>
          <img src={tripLog?.coverImage} />
          <Typography component="h2" variant="h4">
            {tripLog?.name}
          </Typography>
          {tripLog?.isCurrent ? (
            <EndTripButton tripId={tripLog.tripId} />
          ) : (
            <DeleteButton tripLog={tripLog} />
          )}
          <Button onClick={getParkInfo}>Info</Button>
          {/* <Button variant="contained" color="secondary">
            Photos
          </Button> */}
          <Button
            variant="contained"
            onClick={() =>
              history.push(`/log/entry/add?tripId=${tripLog.tripId}`)
            }
          >
            Add Note
          </Button>
          {tripLog.entries?.length > 0 && (
            <Grid
              container
              flexDirection="column"
              spacing={2}
              justifyContent="center"
            >
              {tripLog.entries?.map((entry) => (
                <Grid item key={entry.logId}>
                  <TripLogEntryListItem entry={entry} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      ) : (
        <GetStarted currentTripEmpty={true} />
      )}
    </Container>
  );
}
