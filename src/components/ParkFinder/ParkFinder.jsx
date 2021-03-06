import React from "react";
import { useDispatch } from "react-redux";

import ParkFinderForm from "./ParkFinderForm";
import ParkFinderList from "./ParkFinderList";

import Container from "@mui/material/Container";

export default function ParkFinder() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "MOVE_TO_FINDER" });
    dispatch({ type: "FETCH_TRIP_LISTS" });
  }, []);

  return (
    <Container
      className="background"
      component="main"
      sx={{
        py: 10,
      }}
    >
      <ParkFinderForm />
      <ParkFinderList />
    </Container>
  );
}
