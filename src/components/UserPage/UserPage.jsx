import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import GetStarted from "../GetStarted/GetStarted";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "MOVE_TO_USER" });
  }, []);

  const user = useSelector((store) => store.user);
  const { currentTrip } = useSelector((store) => store.trip);

  return (
    <Container
      className="background"
      component="main"
      maxWidth="sm"
      sx={{ pt: 10 }}
    >
      <Typography component="h2" variant="h4" mt={3}>
        Welcome, {user.username}!
      </Typography>
      {/* <GetStarted hasCurrentTrip={true} /> */}
      <Stack spacing={3} mt={2} alignItems="center">
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ height: 60, width: 150, borderRadius: 10 }}
            onClick={() =>
              history.push(
                `/current/log/${currentTrip.length ? currentTrip[0].id : "0"}`
              )
            }
          >
            Current
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ height: 60, width: 150, borderRadius: 10 }}
            onClick={() => history.push("/finder")}
          >
            Finder
          </Button>
        </Stack>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ height: 60, width: 150, borderRadius: 10 }}
            onClick={() => history.push("/planner")}
          >
            Planner
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ height: 60, width: 150, borderRadius: 10 }}
            onClick={() => history.push("/history")}
          >
            History
          </Button>
        </Stack>
      </Stack>
      <Stack alignItems="center" mt={50}>
        <Button
          onClick={() => dispatch({ type: "LOGOUT" })}
          variant="contained"
          color="danger"
          sx={{ borderRadius: 10, width: 200, height: 45, mx: "auto" }}
        >
          {" "}
          Log Out
        </Button>
      </Stack>

      {/* <LogOutButton className="btn" /> */}
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
