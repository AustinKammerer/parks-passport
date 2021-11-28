import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const user = useSelector((store) => store.user);

  // change the header text depending on the pathname of the current page
  let title;
  if (location.pathname === "/planner") {
    title = "Planner";
  } else if (location.pathname === "/finder") {
    title = "Finder";
  } else if (location.pathname === "/history") {
    title = "History";
  } else if (location.pathname.includes("/current/log/")) {
    title = "Current Log";
  } else if (location.pathname.includes("/history/log/")) {
    title = "Previous Log";
  } else if (location.pathname === "/user") {
    title = "User";
  } else if (location.pathname.includes("/info")) {
    title = "Park Info";
  }

  console.log(location);
  return (
    location.pathname !== "/login" &&
    location.pathname !== "/registration" && (
      <Paper
        square
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 2,
          bgcolor: "#1b5e20",
          color: "#fff",
        }}
      >
        <Typography
          align={"right"}
          variant="body1"
          pr={1}
          lineHeight={0}
          bgcolor="#003300"
          onClick={() => history.push("/user")}
        >
          <PersonIcon sx={{ verticalAlign: "sub" }} />
          {user.username}
        </Typography>
        <Typography component="h1" variant="h3">
          {title}
        </Typography>
      </Paper>
    )
  );
}
