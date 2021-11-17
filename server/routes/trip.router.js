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

router.get("/", rejectUnauthenticated, (req, res) => {
  // GET the list of trips where "is_current" AND "is_complete" are FALSE
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
        AND "is_current" = FALSE
        AND "is_complete" = FALSE
        ORDER BY "states";
  `;

  pool
    .query(query, [req.user.id])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
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

module.exports = router;
