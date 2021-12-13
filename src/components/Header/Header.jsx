import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();
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
    title = "Parks Passport";
  } else if (location.pathname.includes("/info")) {
    title = "Park Info";
  }

  console.log(location);
  return location.pathname !== "/login" &&
    location.pathname !== "/registration" &&
    user.id ? (
    <Paper
      square
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 2,
        bgcolor: theme.palette.primary.main,
        color: "#fff",
      }}
    >
      <Typography
        align={"right"}
        variant="body1"
        pr={1}
        lineHeight={0}
        bgcolor={theme.palette.primary.dark}
        onClick={() => history.push("/user")}
        fontWeight="bold"
      >
        <PersonIcon sx={{ verticalAlign: "sub" }} />
        {user.username}
      </Typography>
      <Box display="flex">
        {location.pathname !== "/login" &&
          location.pathname !== "/registration" && (
            <IconButton
              fontSize="large"
              sx={{ color: "white", mr: 2 }}
              onClick={() => history.goBack()}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        <Typography variant="h4" align="center" fontWeight="lighter" py={1}>
          {title}
        </Typography>
      </Box>
    </Paper>
  ) : (
    ""
  );
}
