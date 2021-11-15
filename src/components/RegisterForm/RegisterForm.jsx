import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Container component="main" maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Paper sx={{ p: 2 }}>
          <Box component="form" onSubmit={registerUser}>
            <Typography component="h2" variant="h4">
              Register User
            </Typography>
            {errors.registrationMessage && (
              <Typography
                component="h3"
                variant="body1"
                className="alert"
                role="alert"
              >
                {errors.registrationMessage}
              </Typography>
            )}
            <TextField
              type="text"
              label="Username"
              name="username"
              value={username}
              variant="standard"
              required
              onChange={(event) => setUsername(event.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              label="Password"
              name="password"
              value={password}
              variant="standard"
              required
              onChange={(event) => setPassword(event.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default RegisterForm;
