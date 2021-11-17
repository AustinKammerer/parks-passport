import { combineReducers } from "redux";

const searchResults = (state = [], action) => {
  switch (action.type) {
    case "SET_RESULTS":
      return action.payload;
    default:
      return state;
  }
};

const searchTerm = (state = "", action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return action.payload;
    default:
      return state;
  }
};

const parkStates = (state = [], action) => {
  switch (action.type) {
    case "SET_STATES":
      return action.payload;
    default:
      return state;
  }
};

const parkInfo = (state = {}, action) => {
  switch (action.type) {
    case "SET_PARK_INFO":
      return action.payload;
    default:
      return state;
  }
};

const wishlist = (state = [], action) => {
  switch (action.type) {
    case "SET_WISHLIST":
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
  wishlist,
});
