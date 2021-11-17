import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";

export default function AddTripButton({ park }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    const { parkCode, name } = park;
    const imagePath = park.images[0].url;
    // send the park to the saga to insert to database
    dispatch({ type: "ADD_TRIP", payload: { parkCode, imagePath, name } });
  };

  return (
    <Button
      size="large"
      color="primary"
      variant="contained"
      onClick={handleAdd}
    >
      Add
    </Button>
  );
}
