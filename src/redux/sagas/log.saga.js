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

// POST a new journal entry
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

// DELETE a log entry (journal/image)
function* deleteLog(action) {
  const logId = action.payload;
  try {
    yield axios.delete(`/api/log/${logId}`);
    console.log("log deleted successfully");
    yield put({ type: "FETCH_TRIP_LOGS" });
  } catch (error) {
    console.log("error deleting log:", error);
    yield put({ type: "DELETE_ERROR" });
  }
}

// PUT request to edit a log
function* editLog(action) {
  const { logId, journalInput, history } = action.payload;
  try {
    yield axios.put(`/api/log/${logId}`, { journalInput });
    console.log("log updated successfully");
    // refresh the user's log list
    // yield put({ type: "FETCH_TRIP_LOGS" });
    yield history.goBack();
  } catch (error) {
    console.log("error deleting log:", error);
    yield put({ type: "DELETE_ERROR" });
  }
}

// watcher saga
function* logSaga() {
  yield takeLatest("FETCH_TRIP_LOGS", fetchTripLogs);
  yield takeLatest("ADD_JOURNAL_ENTRY", addJournalEntry);
  yield takeLatest("DELETE_LOG", deleteLog);
  yield takeLatest("EDIT_LOG", editLog);
}

export default logSaga;
