import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import park from "./park.reducer";
import trip from "./trip.reducer";
import log from "./log.reducer";
import nav from "./nav.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  park, // contains park info from NPS API
  trip, // contains user's trip lists (TripPlanner, currentTrip, tripHistory)
  log, // contains user's trip logs for all trips (images, journal entries)
  nav, // controls the visual indication of the nav bar
});

export default rootReducer;
