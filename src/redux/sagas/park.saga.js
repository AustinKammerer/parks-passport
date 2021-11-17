import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// GET request to NPS API based on the state selected
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
    yield put({ type: "GET_ERROR" });
  }
}

// GET list of states that have parks
function* fetchStates() {
  try {
    // save the response of the GET request to the server
    const states = yield axios.get(`/api/park/states`);
    // send it to the redux store
    yield put({ type: "SET_STATES", payload: states.data });
  } catch (error) {
    console.log("error getting states:", error);
    yield put({ type: "GET_ERROR" });
  }
}

// GET details from the NPS API for a specific park
function* fetchParkInfo(action) {
  // action brings the parkCode with it
  const parkCode = action.payload;
  try {
    // client GET triggers a server GET to the NPS API
    // capture the response from NPS
    const parkInfo = yield axios.get(`/api/park/info?parkCode=${parkCode}`);
    // pull the object we want out of the data.data array and send it to the redux store
    yield put({
      type: "SET_PARK_INFO",
      payload: parkInfo.data.data[0],
    });
  } catch (error) {
    console.log("error getting park info:", error);
    yield put({ type: "GET_ERROR" });
  }
}

// watcher saga
function* parkSaga() {
  yield takeLatest("FETCH_SEARCH_RESULTS", fetchSearchResults);
  yield takeLatest("FETCH_STATES", fetchStates);
  yield takeLatest("FETCH_PARK_INFO", fetchParkInfo);
}

export default parkSaga;
