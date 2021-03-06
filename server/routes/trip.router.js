const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// function to sort the user's trips into an object containing three lists: tripPlanner, currentTrip, tripHistory
// note: a trip may only be on one list at a given time
const sortTrips = (trips) => {
  const tripPlanner = trips.filter(
    (trip) => trip.isCurrent === false && trip.isComplete === false
  );
  const tripHistory = trips.filter(
    (trip) => trip.isCurrent === false && trip.isComplete === true
  );
  const currentTrip = trips.filter(
    (trip) => trip.isCurrent === true && trip.isComplete === false
  );
  return { tripPlanner, tripHistory, currentTrip };
};

// GET route for getting a user's trip lists
router.get("/", rejectUnauthenticated, (req, res) => {
  // get a user's trip records
  const query = `
    SELECT "id", 
        "user_id" AS "userId",
        "name",
        "full_name" AS fullName,
        "park_code" AS "parkCode", 
        "states",
        "image_path" AS "imagePath", 
        "is_current" AS "isCurrent", 
        "is_complete" AS "isComplete",
        "start_date" AS "startDate", 
        "end_date" AS "endDate"
        FROM "trip"
        WHERE "user_id" = $1
        ORDER BY "start_date" DESC, "id" DESC;
  `;

  pool
    .query(query, [req.user.id])
    .then((result) => {
      // console.log(sortTrips(result.rows));
      res.send(sortTrips(result.rows));
    })
    .catch((err) => {
      console.log("Error getting trips from database", err);
      res.sendStatus(500);
    });
});

// POST route for adding a trip to the database
router.post("/", rejectUnauthenticated, (req, res) => {
  // grab the parkCode and imagePath from the client's request
  const { name, fullName, parkCode, imagePath, states, isCurrent } = req.body;
  console.log(req.body);
  // query string for the database
  let query = `
    INSERT INTO "trip" ("user_id", "name", "full_name", "states", "park_code", "image_path", "is_current")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  if (isCurrent) {
    query += 'RETURNING "id";';
  } else {
    query += ";";
  }
  // make the database INSERT query
  pool
    .query(query, [
      req.user.id,
      name,
      fullName,
      states,
      parkCode,
      imagePath,
      isCurrent,
    ])
    .then((result) => {
      req.body.isCurrent ? res.send(result.rows) : res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error POSTing trip to database", err);
      res.sendStatus(500);
    });
});

// PUT route to start a trip - updates "is_current" to TRUE
router.put("/start/:tripId", rejectUnauthenticated, (req, res) => {
  // grab the trip's id from request params
  const { tripId } = req.params;
  console.log(req.params);

  const query = `
    UPDATE "trip" SET "is_current" = TRUE
        WHERE "id" = $1
        AND "user_id" = $2;
  `;
  pool
    .query(query, [tripId, req.user.id])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error updating trip in database", err);
      res.sendStatus(500);
    });
});

// PUT route to end a trip - updates "is_current" to FALSE and "is_complete" to TRUE
router.put("/end/:tripId", rejectUnauthenticated, (req, res) => {
  // grab the trip's id from request params
  const { tripId } = req.params;
  console.log(req.params);

  const query = `
    UPDATE "trip" SET "is_current" = FALSE, "is_complete" = TRUE
        WHERE "id" = $1
        AND "user_id" = $2;
  `;
  pool
    .query(query, [tripId, req.user.id])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error updating trip in database", err);
      res.sendStatus(500);
    });
});

// DELETE route to delete a trip from the database
router.delete("/:tripId", rejectUnauthenticated, (req, res) => {
  // grab the trip's id from request params
  const { tripId } = req.params;
  console.log(req.params);
  // delete the entry from "trip"
  const query = `
    DELETE FROM "trip"
        WHERE "id" = $1
        AND "user_id" = $2;
  `;
  pool
    .query(query, [tripId, req.user.id])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error updating trip in database", err);
      res.sendStatus(500);
    });
});

module.exports = router;
