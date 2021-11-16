import React from "react";
import { useDispatch } from "react-redux";
import states from "../../modules/states";

import ParkFinderForm from "../ParkFinderForm/ParkFinderForm";
import ParkFinderList from "../ParkFinderList/ParkFinderList";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ParkFinder() {
  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h3">
        Park Finder
      </Typography>
      <ParkFinderForm />
    </Container>
  );
}
