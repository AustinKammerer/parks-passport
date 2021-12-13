import React from "react";
import { Link } from "react-router-dom";
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
  padding: "0.25rem 0",
  boxSizing: "content-box",
}));

const CustomBottomNavAction = styled(BottomNavigationAction)(({ theme }) => ({
  color: "#fff",
  "&.MuiBottomNavigationAction-root.Mui-selected": {
    color: theme.palette.secondary.light,
    fontWeight: "bold",
  },
  "&.MuiBottomNavigationAction-root": {
    fontWeight: "bold",
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
