import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// will make get request to NPS API based on the state selected
function* fetchSearchResults(action) {
  const state = action.payload;
  try {
    const searchResults = yield axios.get(
      `/api/parks/finder?stateCode=${state}`
    );
    console.log("search results:", searchResults.data);
  } catch (error) {
    console.log("error getting search results:", error);
  }
}

// watcher saga
function* parkSaga() {
  yield takeLatest("FETCH_SEARCH_RESULTS", fetchSearchResults);
}

export default parkSaga;
