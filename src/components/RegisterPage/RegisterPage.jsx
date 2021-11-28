import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import RegisterForm from "../RegisterForm/RegisterForm";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "MOVE_TO_LOGIN" });
  });

  const [image, setImage] = React.useState("images/half-dome-wallpaper.jpg");

  return (
    <div>
      <img src={image} />
      <RegisterForm />

      <Grid container columnSpacing={2} justifyContent="center" mt={3}>
        <Grid item>
          <Typography variant="body1">Already have an account?</Typography>
        </Grid>
        <Grid item>
          <Link
            variant="body1"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default RegisterPage;
