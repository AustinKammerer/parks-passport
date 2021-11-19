import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// GET user's trip logs for all trips (images, journal entries)
function* fetchTripLogs() {
  try {
    // save the response from the database
    const tripLogs = yield axios.get("/api/log");
    // send response to the redux store
    yield put({ type: "SET_TRIP_LOGS", payload: tripLogs.data });
  } catch (error) {
    console.log("error getting logs:", error);
    yield put({ type: "GET_ERROR" });
  }
}

function* addJournalEntry(action) {
  const { tripId, journalInput, history } = action.payload;
  console.log(journalInput);
  try {
    yield axios.post(`/api/log/${tripId}`, { journalInput });
    console.log("journal POST success");
    yield put({ type: "CLEAR_JOURNAL_INPUT" });
    yield history.goBack();
  } catch (error) {
    console.log("error POSTing log:", error);
    yield put({ type: "POST_ERROR" });
  }
}

// watcher saga
function* logSaga() {
  yield takeLatest("FETCH_TRIP_LOGS", fetchTripLogs);
  yield takeLatest("ADD_JOURNAL_ENTRY", addJournalEntry);
}

export default logSaga;
