import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import GetStarted from "../GetStarted/GetStarted";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "FETCH_TRIP_LISTS" });
  }, []);

  const user = useSelector((store) => store.user);
  const { wishlist, currentLog } = useSelector((store) => store.trip);

  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h2" variant="h4">
        Welcome, {user.username}!
      </Typography>
      {wishlist?.length > 0 ? "under construction" : <GetStarted user={user} />}
      {/* <LogOutButton className="btn" /> */}
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
