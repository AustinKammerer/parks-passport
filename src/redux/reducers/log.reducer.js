import { combineReducers } from "redux";

// reducer for storing a user's logs (images and journal entries)
// for all trips
const tripLogs = (state = [], action) => {
  switch (action.type) {
    case "SET_TRIP_LOGS":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  tripLogs,
});
