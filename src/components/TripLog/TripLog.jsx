import { useSelector, useDispatch } from "react-redux";

import { EndTripButton } from "../Buttons";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function TripLog() {
  const { currentLog } = useSelector((store) => store.trip);
  return (
    <Box>
      <Typography variant="body2">{JSON.stringify(currentLog)}</Typography>
      <img src={currentLog[0].imagePath} />
      <EndTripButton trip={currentLog[0]} />
    </Box>
  );
}
