import ParkFinderForm from "../ParkFinderForm/ParkFinderForm";
import ParkFinderList from "../ParkFinderList/ParkFinderList";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function ParkFinder() {
  return (
    <Container component="main">
      <Typography component="h1" variant="h3">
        Park Finder
      </Typography>
      <ParkFinderForm />
      <ParkFinderList />
    </Container>
  );
}
