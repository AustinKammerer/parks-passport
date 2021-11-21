import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// GET user's tripPlanner , current trip, and trip history
function* fetchTripLists() {
  try {
    // save the response from the database
    const tripLists = yield axios.get("/api/trip");
    // send response to the redux store
    yield put({ type: "SET_TRIP_LISTS", payload: tripLists.data });
  } catch (error) {
    console.log("error getting trips:", error);
    yield put({ type: "GET_ERROR" });
  }
}

// POST a park to the "trip" table in database
function* addTrip(action) {
  // payload contains parkCode and default imagePath
  const { parkCode, imagePath, name, states, isCurrent, history } =
    action.payload;
  try {
    // POST request
    const response = yield axios.post(`/api/trip`, {
      parkCode,
      imagePath,
      name,
      states,
      isCurrent,
    });
    console.log("POST success");
    // refresh the user's list
    yield put({ type: "FETCH_TRIP_LISTS" });
    // if the trip being added is also being activated, direct to it
    isCurrent && history.push(`/current?tripId=${response.data[0].id}`);
  } catch (error) {
    console.log("error adding trip:", error);
    yield put({ type: "POST_ERROR" });
  }
}

// PUT request to start a trip - flips "is_current" to TRUE
function* startTrip(action) {
  // payload contains the trip's id
  const { tripId, history } = action.payload;
  try {
    // PUT request
    yield axios.put(`/api/trip/start/${tripId}`);
    console.log("trip started");
    // refresh the user's lists
    // yield put({ type: "FETCH_TRIP_LISTS" });
    history.push(`/current?tripId=${tripId}`);
  } catch (error) {
    console.log("error starting trip:", error);
    yield put({ type: "PUT_ERROR" });
  }
}

// PUT request to end a trip - flips "is_current" to FALSE and "is_complete" to TRUE
function* endTrip(action) {
  // payload contains the trip's id
  const { tripId, history } = action.payload;
  try {
    // PUT request
    yield axios.put(`/api/trip/end/${tripId}`);
    console.log("trip ended");
    // refresh the user's lists
    // yield put({ type: "FETCH_TRIP_LISTS" });
    // directs the user back to UserPage
    history.push("/user");
  } catch (error) {
    console.log("error ending trip:", error);
    yield put({ type: "PUT_ERROR" });
  }
}

// DELETE request to remove a trip from a user's list ("trip" table)
function* deleteTrip(action) {
  // payload contains the trip's id
  const tripId = action.payload;
  try {
    // DELETE request
    yield axios.delete(`/api/trip/${tripId}`);
    console.log("trip deleted");
    // refresh user's lists
    yield put({ type: "FETCH_TRIP_LISTS" });
  } catch (error) {
    console.log("error deleting trip:", error);
    yield put({ type: "DELETE_ERROR" });
  }
}

// watcher saga
function* tripSaga() {
  yield takeLatest("FETCH_TRIP_LISTS", fetchTripLists);
  yield takeLatest("ADD_TRIP", addTrip);
  yield takeLatest("START_TRIP", startTrip);
  yield takeLatest("END_TRIP", endTrip);
  yield takeLatest("DELETE_TRIP", deleteTrip);
}

export default tripSaga;
