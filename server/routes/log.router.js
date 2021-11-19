const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET request for getting a user's log records for all trips
router.get("/", rejectUnauthenticated, (req, res) => {
  const query = `
    SELECT 
		    "trip"."user_id" AS "userId",
        "log"."id",
        "log"."trip_id" AS "tripId",
        "log"."type",
        "log"."text",
        "log"."image_path" AS "imagePath"
        FROM "trip"
        JOIN "log" ON "trip"."id" = "log"."trip_id"
        WHERE "user_id" = ${req.user.id}
        ORDER BY "log"."trip_id";
  `;
  pool
    .query(query)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })

    .catch((err) => {
      console.log("Error getting logs from database", err);
      res.sendStatus(500);
    });
});

module.exports = router;
