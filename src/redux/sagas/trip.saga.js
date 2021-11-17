import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// GET user's trip wishlist
function* fetchWishlist() {
  try {
    // save the response from the database
    const tripWishlist = yield axios.get("/api/trip");
    // send response to the redux store
    yield put({ type: "SET_WISHLIST", payload: tripWishlist.data });
  } catch (error) {
    console.log("error getting wishlist:", error);
    yield put({ type: "GET_ERROR" });
  }
}

// POST a park to the "trip" table in database
function* addTrip(action) {
  // payload contains parkCode and default imagePath
  try {
    // POST request
    yield axios.post(`/api/trip`, action.payload);
    console.log("POST success");
  } catch (error) {
    console.log("error adding trip:", error);
    yield put({ type: "POST_ERROR" });
  }
}

// PUT request to start a trip - flips "is_current" to TRUE
function* startTrip(action) {
  // payload contains the trip's id
  const tripId = action.payload;
  try {
    // PUT request
    yield axios.put(`/api/trip/start/${tripId}`);
    console.log("trip started");
    yield put({ type: "FETCH_WISHLIST" });
  } catch (error) {
    console.log("error starting trip:", error);
    yield put({ type: "POST_ERROR" });
  }
}

// watcher saga
function* tripSaga() {
  yield takeLatest("FETCH_WISHLIST", fetchWishlist);
  yield takeLatest("ADD_TRIP", addTrip);
  yield takeLatest("START_TRIP", startTrip);
}

export default tripSaga;
