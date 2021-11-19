import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function GetStarted() {
  const history = useHistory();
  return (
    <Box>
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
    </Box>
  );
}
