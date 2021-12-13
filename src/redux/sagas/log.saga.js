import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// GET user's trip log for a trip (images, journal entries)
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

// GET the log entry the user wants to edit
function* fetchLogEntryToEdit(action) {
  const logId = action.payload;
  try {
    const entry = yield axios.get(`/api/log/entry/${logId}`);

    yield put({ type: "SET_EDIT_ITEM", payload: entry.data[0] });
  } catch (error) {
    console.log("error getting log entry:", error);
    yield put({ type: "GET_ERROR" });
  }
}

// POST a new journal entry
function* addEntry(action) {
  const { tripId, formData } = action.payload;
  console.log(action.payload);
  try {
    yield axios.post(`/api/log/entry`, formData);
    console.log("log entry POST success");
    // clear the input field
    yield put({ type: "CLEAR_ENTRY_INPUT" });
    // close the form dialog
    yield put({ type: "CLOSE_NEW_ENTRY_DIALOG" });
    // refresh the logs
    yield put({ type: "FETCH_TRIP_LOG", payload: tripId });
  } catch (error) {
    console.log("error POSTing log entry:", error);
    yield put({ type: "POST_ERROR" });
  }
}

// DELETE a log entry (journal/image)
function* deleteEntry(action) {
  const logId = action.payload;
  try {
    const response = yield axios.delete(`/api/log/entry/${logId}`);
    console.log("log deleted successfully from trip", response.data);
    yield put({ type: "FETCH_TRIP_LOG", payload: response.data[0].tripId });
  } catch (error) {
    console.log("error deleting log entry:", error);
    yield put({ type: "DELETE_ERROR" });
  }
}

// PUT request to edit a log
function* editEntry(action) {
  // const { tripId, logId, formData } = action.payload;
  const { editEntry, tripId } = action.payload;
  try {
    yield axios.put(`/api/log/entry/${editEntry.logId}`, editEntry);
    console.log("log entry updated successfully");
    // clear the input field
    yield put({ type: "CLEAR_EDIT_ITEM" });
    // close the form dialog
    yield put({ type: "CLOSE_EDIT_ENTRY_DIALOG" });
    // refresh the logs
    yield put({ type: "FETCH_TRIP_LOG", payload: tripId });
  } catch (error) {
    console.log("error updating log entry:", error);
    yield put({ type: "PUT_ERROR" });
  }
}

// watcher saga
function* logSaga() {
  yield takeLatest("FETCH_TRIP_LOG", fetchTripLog);
  yield takeLatest("FETCH_ENTRY_TO_EDIT", fetchLogEntryToEdit);
  yield takeLatest("ADD_ENTRY", addEntry);
  yield takeLatest("DELETE_ENTRY", deleteEntry);
  yield takeLatest("EDIT_ENTRY", editEntry);
}

export default logSaga;
