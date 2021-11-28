import { combineReducers } from "redux";

// reducer for storing a user's log (images and journal entries) for a selected trip
const tripLog = (state = {}, action) => {
  switch (action.type) {
    case "SET_TRIP_LOG":
      return action.payload;
    default:
      return state;
  }
};

// reducer to store user's new entry input
const newEntry = (state = {}, action) => {
  switch (action.type) {
    case "NEW_ENTRY_ONCHANGE":
      return { ...state, [action.payload.property]: action.payload.value };
    // case "NEW_IMAGE_ONCHANGE":
    //   return { ...state, [action.payload.property]: action.payload.value };
    case "CLEAR_ENTRY_INPUT":
      return {};
    default:
      return state;
  }
};

const newEntryDialogOpen = (state = false, action) => {
  switch (action.type) {
    case "OPEN_NEW_ENTRY_DIALOG":
      return true;
    case "CLOSE_NEW_ENTRY_DIALOG":
      return false;
    default:
      return state;
  }
};

// payload={property:property, value:value}
// reducer for storing the entry to be edited and new values from input
const editEntry = (state = {}, action) => {
  switch (action.type) {
    case "SET_EDIT_ITEM":
      return action.payload;
    case "EDIT_ENTRY_ONCHANGE":
      return { ...state, [action.payload.property]: action.payload.value };
    case "CLEAR_EDIT_ITEM":
      return {};
    default:
      return state;
  }
};

const editEntryDialogOpen = (state = false, action) => {
  switch (action.type) {
    case "OPEN_EDIT_ENTRY_DIALOG":
      return true;
    case "CLOSE_EDIT_ENTRY_DIALOG":
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  tripLog,
  newEntry,
  editEntry,
  newEntryDialogOpen,
  editEntryDialogOpen,
});
