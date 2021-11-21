import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// GET user's trip logs for all trips (images, journal entries)
function* fetchTripLog(action) {
  const tripId = action.payload;
  try {
    // save the response from the database
    const tripLog = yield axios.get(`/api/log/${tripId}`);
    // send response to the redux store
    yield put({ type: "SET_TRIP_LOG", payload: tripLog.data });
  } catch (error) {
    console.log("error getting log:", error);
    yield put({ type: "GET_ERROR" });
  }
}

// POST a new journal entry
function* addEntry(action) {
  const { tripId, journalInput, history } = action.payload;
  console.log(journalInput);
  try {
    yield axios.post(`/api/log/${tripId}`, { journalInput });
    console.log("journal POST success");
    // clear the input field
    yield put({ type: "CLEAR_JOURNAL_INPUT" });
    // redirect back to CurrentTrip
    yield history.push(`/current?tripId=${tripId}`);
  } catch (error) {
    console.log("error POSTing log:", error);
    yield put({ type: "POST_ERROR" });
  }
}

// DELETE a log entry (journal/image)
function* deleteEntry(action) {
  const { logId, tripId } = action.payload;
  try {
    yield axios.delete(`/api/log/${logId}`);
    console.log("log deleted successfully");
    yield put({ type: "FETCH_TRIP_LOG", payload: tripId });
  } catch (error) {
    console.log("error deleting log:", error);
    yield put({ type: "DELETE_ERROR" });
  }
}

// PUT request to edit a log
function* editEntry(action) {
  const { tripId, logId, journalInput, history } = action.payload;
  try {
    yield axios.put(`/api/log/${logId}`, { journalInput });
    console.log("log updated successfully");
    // clear the input field
    yield put({ type: "CLEAR_JOURNAL_INPUT" });
    // redirect back to CurrentTrip
    yield history.push(`/current?tripId=${tripId}`);
  } catch (error) {
    console.log("error deleting log:", error);
    yield put({ type: "DELETE_ERROR" });
  }
}

// watcher saga
function* logSaga() {
  yield takeLatest("FETCH_TRIP_LOG", fetchTripLog);
  yield takeLatest("ADD_ENTRY", addEntry);
  yield takeLatest("DELETE_ENTRY", deleteEntry);
  yield takeLatest("EDIT_ENTRY", editEntry);
}

export default logSaga;
