import { combineReducers } from "redux";

const indicator = (state = -1, action) => {
  switch (action.type) {
    case "MOVE_TO_CURRENT":
      return 0;
    case "MOVE_TO_FINDER":
      return 1;
    case "MOVE_TO_PLANNER":
      return 2;
    case "MOVE_TO_HISTORY":
      return 3;
    case "MOVE_TO_USER":
      return -1;
    case "MOVE_TO_LOGIN":
      return 0;
    default:
      return state;
  }
};

export default combineReducers({ indicator });
