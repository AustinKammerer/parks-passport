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

// reducer to store user's journal form input
const journalInput = (state = "", action) => {
  switch (action.type) {
    case "SET_JOURNAL_INPUT":
      return action.payload;
    case "CLEAR_JOURNAL_INPUT":
      return "";
    default:
      return state;
  }
};

export default combineReducers({
  tripLogs,
  journalInput,
});
