import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ParkFinder from "../ParkFinder/ParkFinder";
import ParkInfo from "../ParkInfo/ParkInfo";
import TripPlanner from "../TripPlanner/TripPlanner";
import TripHistory from "../TripHistory/TripHistory";
import GetStarted from "../GetStarted/GetStarted";
import TripLog from "../TripLog/TripLog";
import Header from "../Header/Header";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    danger: {
      main: "#ac1900",
      contrastText: "#fff",
    },
    primary: {
      main: "#1b5e20",
      light: "#4c8c4a",
      dark: "#003300",
    },
    secondary: {
      main: "#e65100",
      light: "#ff833a",
      dark: "#ac1900",
    },
  },
});

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  // const { currentTrip } = useSelector((store) => store.trip);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
    // dispatch({ type: "FETCH_TRIP_LISTS" });
  }, [dispatch]);

  // const currentLogPath = `/current/log/${currentTrip[0].tripId}`;

  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <div>
          <Header />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/login" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            {/* Get Started */}
            <ProtectedRoute
              // logged in shows GetStarted else shows LoginPage
              exact
              path="/start"
            >
              <GetStarted />
            </ProtectedRoute>

            {/* TripPlanner */}
            <ProtectedRoute
              // logged in shows TripPlanner else shows LoginPage
              exact
              path="/planner"
            >
              <TripPlanner />
            </ProtectedRoute>

            {/* Current Trip Log */}
            <ProtectedRoute
              // logged in shows TripLog else shows LoginPage
              exact
              path="/current/log/:tripId"
            >
              <TripLog actionType={"MOVE_TO_CURRENT"} />
            </ProtectedRoute>

            {/* Trip History */}
            <ProtectedRoute
              // logged in shows TripHistory else shows LoginPage
              exact
              path="/history"
            >
              <TripHistory />
            </ProtectedRoute>

            {/* History Trip Log */}
            <ProtectedRoute
              // logged in shows TripLog else shows LoginPage
              exact
              path="/history/log/:tripId"
            >
              <TripLog actionType={"MOVE_TO_HISTORY"} />
            </ProtectedRoute>

            {/* Park Finder */}
            <Route exact path="/finder">
              <ParkFinder />
            </Route>

            {/* Park Info */}
            <Route exact path="/info/:parkCode">
              <ParkInfo />
            </Route>

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /user page
                <Redirect to={"/user"} />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the current log page
                <Redirect to={"/user"} />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            {/* <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the current log page
              <Redirect to="/current/log/:tripId" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route> */}

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          {/* <Footer /> */}
          <Nav />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
