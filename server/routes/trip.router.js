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
router.get("/", (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

// POST route for adding a trip to the database
router.post("/", rejectUnauthenticated, (req, res) => {
  // grab the parkCode and imagePath from the client's request
  const { parkCode, imagePath } = req.body;
  console.log(req.body);
  // query string for the database
  const query = `
    INSERT INTO "trip" ("user_id", "park_code", "image_path")
        VALUES ($1, $2, $3);
  `;
  // make the database INSERT query
  pool
    .query(query, [req.user.id, parkCode, imagePath])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error POSTing trip to database", err);
      res.sendStatus(500);
    });
});

module.exports = router;
