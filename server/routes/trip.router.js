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
        "image_path" AS "imagePath", 
        "is_current" AS "isCurrent", 
        "is_complete" AS "isComplete" 
        FROM "trip"
        WHERE "user_id" = ${req.user.id}
        AND "is_current" = FALSE
        AND "is_complete" = FALSE;
  `;

  pool
    .query(query)
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
  const { name, parkCode, imagePath } = req.body;
  console.log(req.body);
  // query string for the database
  const query = `
    INSERT INTO "trip" ("user_id", "name", "park_code", "image_path")
        VALUES ($1, $2, $3, $4);
  `;
  // make the database INSERT query
  pool
    .query(query, [req.user.id, name, parkCode, imagePath])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error POSTing trip to database", err);
      res.sendStatus(500);
    });
});

module.exports = router;
