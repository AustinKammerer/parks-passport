import { combineReducers } from "redux";

// stores the user's wishlist
// contains all rows in "trips" table where "is_current" and "is_complete" are FALSE
const wishlist = (state = [], action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  wishlist,
});
