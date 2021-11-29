import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LoginIcon from "@mui/icons-material/Login";
import { styled } from "@mui/material/styles";

const CustomBottomNav = styled(BottomNavigation)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "0.5em 0",
}));

const CustomBottomNavAction = styled(BottomNavigationAction)(({ theme }) => ({
  color: "#fff",
  "&.MuiBottomNavigationAction-root.Mui-selected": {
    color: theme.palette.secondary.light,
  },
}));

function Nav() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const { currentTrip } = useSelector((store) => store.trip);
  const { indicator } = useSelector((store) => store.nav);

  const currentTripPath = `/current/log/${
    currentTrip.length ? currentTrip[0].id : "0"
  }`;

  return (
    // <div className="nav">
    //   <Link to="/home">
    //     <h2 className="nav-title">Prime Solo Project</h2>
    //   </Link>
    //   <div>
    //     {/* If no user is logged in, show these links */}
    //     {user.id === null && (
    //       // If there's no user, show login/registration links
    //       <Link className="navLink" to="/login">
    //         Login / Register
    //       </Link>
    //     )}

    //     {/* If a user is logged in, show these links */}
    //     {user.id && (
    //       <>
    //         <Link className="navLink" to="/user">
    //           Home
    //         </Link>

    //         <Link className="navLink" to="/placeholder">
    //           Blank
    //         </Link>

    //         <Link className="navLink" to="/planner">
    //           Planner
    //         </Link>

    //         <Link className="navLink" to="/finder">
    //           Finder
    //         </Link>

    //         <Link className="navLink" to="/history">
    //           History
    //         </Link>

    //         <LogOutButton className="navLink" />
    //       </>
    //     )}

    //     <Link className="navLink" to="/about">
    //       About
    //     </Link>
    //   </div>
    // </div>
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }}
        elevation={15}
      >
        {!user.id && (
          <CustomBottomNav showLabels value={indicator}>
            <CustomBottomNavAction
              component={Link}
              to="/login"
              label="Login / Register"
              icon={<LoginIcon />}
            />
          </CustomBottomNav>
        )}
        {user.id && (
          <CustomBottomNav showLabels value={indicator}>
            <CustomBottomNavAction
              component={Link}
              to={currentTripPath}
              label="Current"
              icon={<MenuBookIcon fontSize="large" />}
            />
            <CustomBottomNavAction
              component={Link}
              to="/finder"
              label="Finder"
              icon={<SearchIcon fontSize="large" />}
              onClick={() => dispatch({ type: "CLEAR_RESULTS" })}
            />
            <CustomBottomNavAction
              component={Link}
              to="/planner"
              label="Planner"
              icon={<BookmarksIcon fontSize="large" />}
            />
            <CustomBottomNavAction
              component={Link}
              to="/history"
              label="History"
              icon={<DateRangeIcon fontSize="large" />}
            />
          </CustomBottomNav>
        )}
      </Paper>
    </Box>
  );
}

export default Nav;
