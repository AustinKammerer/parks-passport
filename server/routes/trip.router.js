const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
// router.get("/", (req, res) => {
//   // GET route code here
// });

// function to sort the user's trips into an object containing three lists: wishlist, currentLog, logHistory
// note: a trip may only be on one list at a given time
const sortTrips = (trips) => {
  const wishlist = trips.filter(
    (trip) => trip.isCurrent === false && trip.isComplete === false
  );
  const logHistory = trips.filter(
    (trip) => trip.isCurrent === false && trip.isComplete === true
  );
  const currentLog = trips.filter(
    (trip) => trip.isCurrent === true && trip.isComplete === false
  );
  return { wishlist, logHistory, currentLog };
};

router.get("/", rejectUnauthenticated, (req, res) => {
  // GET the list of trips where "is_current" AND "is_complete" are FALSE
  // const query = `
  //   SELECT "id",
  //       "name",
  //       "park_code" AS "parkCode",
  //       "states",
  //       "image_path" AS "imagePath",
  //       "is_current" AS "isCurrent",
  //       "is_complete" AS "isComplete"
  //       FROM "trip"
  //       WHERE "user_id" = $1
  //       AND "is_current" = FALSE
  //       AND "is_complete" = FALSE
  //       ORDER BY "states";
  // `;
  const query = `
    SELECT "id", 
        "name",
        "park_code" AS "parkCode", 
        "states",
        "image_path" AS "imagePath", 
        "is_current" AS "isCurrent", 
        "is_complete" AS "isComplete" 
        FROM "trip"
        WHERE "user_id" = $1
        ORDER BY "states";
  `;

  pool
    .query(query, [req.user.id])
    .then((result) => {
      console.log(sortTrips(result.rows));
      res.send(sortTrips(result.rows));
    })
    .catch((err) => {
      console.log("Error getting trips from database", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
// router.post("/", (req, res) => {
//   // POST route code here
// });

// POST route for adding a trip to the database
router.post("/", rejectUnauthenticated, (req, res) => {
  // grab the parkCode and imagePath from the client's request
  const { name, parkCode, imagePath, states } = req.body;
  console.log(req.body);
  // query string for the database
  const query = `
    INSERT INTO "trip" ("user_id", "name", "states", "park_code", "image_path")
        VALUES ($1, $2, $3, $4, $5);
  `;
  // make the database INSERT query
  pool
    .query(query, [req.user.id, name, states, parkCode, imagePath])
    .then((response) => {
      res.sendStatus(201);
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
