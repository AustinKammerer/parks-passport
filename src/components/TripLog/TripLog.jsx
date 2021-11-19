import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { EndTripButton } from "../Buttons";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function TripLog() {
  const history = useHistory();
  const { currentLog } = useSelector((store) => store.trip);

  const getParkInfo = () => {
    console.log(currentLog[0].parkCode);
    history.push(`/info/${currentLog[0].parkCode}`);
  };

  return (
    <Box>
      <Typography variant="body2">{JSON.stringify(currentLog)}</Typography>
      <img src={currentLog[0].imagePath} />
      <EndTripButton trip={currentLog[0]} />
      <Button onClick={getParkInfo}>Info</Button>
      <Button variant="contained" color="secondary">
        Photos
      </Button>
      <Button
        variant="contained"
        onClick={() => history.push(`/journal/${currentLog[0].id}`)}
      >
        Add Note
      </Button>
    </Box>
  );
}
