import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

export default function BackButton() {
  const history = useHistory();

  return (
    <Button variant="outlined" onClick={() => history.goBack()}>
      Back
    </Button>
  );
}
