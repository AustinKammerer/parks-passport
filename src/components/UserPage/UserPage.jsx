import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h2" variant="h4">
        Welcome, {user.username}!
      </Typography>
      <Typography component="h3" variant="h5" mt={2}>
        It doesn't look like you have any parks yet...
      </Typography>
      <Typography component="h4" variant="h6" mt={2} textAlign="center">
        Use the Park Finder to get started!
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          size="large"
          sx={{ height: 80, width: 200 }}
          onClick={() => history.push("/finder")}
        >
          Get Started
        </Button>
      </Box>
      {/* <LogOutButton className="btn" /> */}
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
