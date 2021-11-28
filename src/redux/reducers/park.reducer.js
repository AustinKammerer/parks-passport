import { combineReducers } from "redux";

// stores search-by-state results from NPS
const searchResults = (state = [], action) => {
  switch (action.type) {
    case "SET_RESULTS":
      return action.payload;
    case "CLEAR_RESULTS":
      return [];
    default:
      return state;
  }
};

// stores the user's search term
const searchTerm = (state = "", action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return action.payload;
    default:
      return state;
  }
};

// stores the list of US states that contain Natl Parks for ParkFinder selector input options
const parkStates = (state = [], action) => {
  switch (action.type) {
    case "SET_STATES":
      return action.payload;
    default:
      return state;
  }
};

// stores a park's NPS API entry for the ParkInfo view
const parkInfo = (state = {}, action) => {
  switch (action.type) {
    case "SET_PARK_INFO":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  searchResults,
  searchTerm,
  parkStates,
  parkInfo,
});
