import { combineReducers } from "redux";

// stores the user's wishlist
// contains all rows in "trips" table where "is_current" and "is_complete" are FALSE
const wishlist = (state = [], action) => {
  switch (action.type) {
    case "SET_TRIP_LISTS":
      return action.payload.wishlist;
    default:
      return state;
  }
};

// contains all rows in "trips" table where "is_current" is TRUE and "is_complete" is FALSE
const currentLog = (state = [], action) => {
  switch (action.type) {
    case "SET_TRIP_LISTS":
      return action.payload.currentLog;
    default:
      return state;
  }
};

// contains all rows in "trips" table where "is_current" is FALSE and "is_complete" is TRUE
const tripHistory = (state = [], action) => {
  switch (action.type) {
    case "SET_TRIP_LISTS":
      return action.payload.tripHistory;
    default:
      return state;
  }
};

export default combineReducers({
  wishlist,
  currentLog,
  tripHistory,
});
