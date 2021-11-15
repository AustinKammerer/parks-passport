import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function LoginPage() {
  const history = useHistory();

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
    </div>
  );
}

export default LoginPage;
