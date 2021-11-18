import { useSelector, useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";

export default function TripLog() {
  const { currentLog } = useSelector((store) => store.trip);
  return <Typography variant="body2">{JSON.stringify(currentLog)}</Typography>;
}
