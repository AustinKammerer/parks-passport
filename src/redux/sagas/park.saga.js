import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// will make get request to NPS API based on the state selected
function* fetchSearchResults(action) {
  // user selected state to search for parks
  const state = action.payload;
  try {
    // GET request to /finder which then sends a GET to the NPS API with a state query
    // response is a list of parks in that state
    const searchResults = yield axios.get(
      `/api/park/finder?stateCode=${state}`
    );
    console.log("search results:", searchResults.data);
    // send the response to the searchResults reducer
    yield put({ type: "SET_RESULTS", payload: searchResults.data });
  } catch (error) {
    console.log("error getting search results:", error);
  }
}

// get list of states that have parks
function* fetchStates() {
  try {
    const states = yield axios.get(`/api/park/states`);
    yield put({ type: "SET_STATES", payload: states.data });
  } catch (error) {
    console.log("error getting states:", error);
  }
}

// watcher saga
function* parkSaga() {
  yield takeLatest("FETCH_SEARCH_RESULTS", fetchSearchResults);
  yield takeLatest("FETCH_STATES", fetchStates);
}

export default parkSaga;
