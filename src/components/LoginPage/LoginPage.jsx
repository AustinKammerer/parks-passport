import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginForm from "../LoginForm/LoginForm";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "MOVE_TO_LOGIN" });
  });

  const [image, setImage] = React.useState("images/half-dome-wallpaper.jpg");

  return (
    <div>
      <img src={image} />
      <LoginForm />

      {/* <center>
        <p>New User?</p>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push("/registration");
          }}
        >
          Register
        </button>
      </center> */}
      <Grid container columnSpacing={2} justifyContent="center" mt={3}>
        <Grid item>
          <Typography variant="body1">Don't have an account?</Typography>
        </Grid>
        <Grid item>
          <Link
            variant="body1"
            onClick={() => {
              history.push("/registration");
            }}
          >
            Register
          </Link>
        </Grid>
      </Grid>
      {/* <Redirect from="/user" to="/login" /> */}
    </div>
  );
}

export default LoginPage;
