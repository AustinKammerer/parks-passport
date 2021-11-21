import { combineReducers } from "redux";

// stores the user's tripPlanner list
// contains all rows in "trips" table where "is_current" and "is_complete" are FALSE
const tripPlanner = (state = [], action) => {
  switch (action.type) {
    case "SET_TRIP_LISTS":
      return action.payload.tripPlanner;
    default:
      return state;
  }
};

// stores the user's currentTrip
// contains all rows in "trips" table where "is_current" is TRUE and "is_complete" is FALSE
const currentTrip = (state = [], action) => {
  switch (action.type) {
    case "SET_TRIP_LISTS":
      return action.payload.currentTrip;
    default:
      return state;
  }
};

// stores the user's tripHistory
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
  tripPlanner,
  currentTrip,
  tripHistory,
});
